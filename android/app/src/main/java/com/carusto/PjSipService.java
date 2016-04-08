package com.carusto;

import android.app.Service;
import android.content.Intent;
import android.os.*;
import android.os.Process;
import android.util.Log;
import com.facebook.stetho.common.StringUtil;
import org.pjsip.pjsua2.*;

import java.util.*;

public class PjSipService extends Service {

    private static String TAG = "PjSipService";

    private HandlerThread mWorkerThread;

    private Handler mHandler;

    private Endpoint mEndpoint;

    private PjSipLogWriter mLogWriter;

    private PjSipBroadcastEmiter mEmitter;

    private List<PjSipAccount> mAccounts = new ArrayList<>();

    private List<Object> mTrash = new LinkedList<>();

    public PjSipBroadcastEmiter getEmitter() {
        return mEmitter;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        Log.d(TAG, "onCreate");

        super.onCreate();

        mWorkerThread = new HandlerThread(getClass().getSimpleName(), Process.THREAD_PRIORITY_FOREGROUND);
        mWorkerThread.setPriority(Thread.MAX_PRIORITY);
        mWorkerThread.start();
        mHandler = new Handler(mWorkerThread.getLooper());

        mEmitter = new PjSipBroadcastEmiter(this);

//        new Timer().scheduleAtFixedRate(new TimerTask() {
//            @Override
//            public void run(){
//                job(new Runnable() {
//                    @Override
//                    public void run() {
//                        Log.d(TAG, "service tick");
//                    }
//                });
//            }
//        }, 0, 1000);

        job(new Runnable() {
            @Override
            public void run() {
                load();

//                Logger.debug(TAG, "Creating SipService with priority: " + Thread.currentThread().getPriority());
//
//                loadNativeLibraries();
//
//                mRingtoneUri = RingtoneManager.getActualDefaultRingtoneUri(SipService.this, RingtoneManager.TYPE_RINGTONE);
//                mAudioManager = (AudioManager) getSystemService(AUDIO_SERVICE);
//                mVibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
//
//                mBroadcastEmitter = new BroadcastEventEmitter(SipService.this);
//                loadConfiguredAccounts();
//                addAllConfiguredAccounts();
//
//                Logger.debug(TAG, "SipService created!");
            }
        });
    }

    private void load() {
        // Load native libraries
        try {
            System.loadLibrary("openh264");
        } catch (UnsatisfiedLinkError error) {
            Log.e(TAG, "Error while loading OpenH264 native library", error);
            throw new RuntimeException(error);
        }

        try {
            System.loadLibrary("yuv");
        } catch (UnsatisfiedLinkError error) {
            Log.e(TAG, "Error while loading libyuv native library", error);
            throw new RuntimeException(error);
        }

        try {
            System.loadLibrary("pjsua2");
        } catch (UnsatisfiedLinkError error) {
            Log.e(TAG, "Error while loading PJSIP pjsua2 native library", error);
            throw new RuntimeException(error);
        }

        // Start stack
        try {
            mEndpoint = new Endpoint();
            mEndpoint.libCreate();
            mEndpoint.libRegisterThread(Thread.currentThread().getName());

            EpConfig epConfig = new EpConfig();

            epConfig.getLogConfig().setLevel(4);
            epConfig.getLogConfig().setConsoleLevel(4);

            mLogWriter = new PjSipLogWriter();
            epConfig.getLogConfig().setWriter(mLogWriter);

            // epConfig.getUaConfig().setUserAgent("");
            epConfig.getMedConfig().setHasIoqueue(true);
            epConfig.getMedConfig().setClockRate(8000);
            epConfig.getMedConfig().setQuality(4);
            epConfig.getMedConfig().setEcOptions(1);
            epConfig.getMedConfig().setEcTailLen(200);
            epConfig.getMedConfig().setThreadCnt(2);
            mEndpoint.libInit(epConfig);

            mTrash.add(epConfig);

            mEndpoint.libStart();
        } catch (Exception e) {
            Log.e(TAG, "Error while starting PJSIP", e);
        }
    }

    @Override
    public int onStartCommand(final Intent intent, int flags, int startId) {
        job(new Runnable() {
            @Override
            public void run() {
                handle(intent);
            }
        });

        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "onDestroy");
        mWorkerThread.quitSafely();
        super.onDestroy();
    }

    private void handle(Intent intent) {
        if (intent == null || intent.getAction() == null) {
            return;
        }

        switch (intent.getAction()) {
            // Account actions
            case PjActions.ACTION_START:
                handleStart(intent);
                break;
            case PjActions.ACTION_ACCOUNT_CREATE:
                handleAccountCreate(intent);
                break;
            case PjActions.ACTION_ACCOUNT_DELETE:
                handleAccountDelete(intent);
                break;

            // TODO: Call actions
        }
    }

    private void job(Runnable job) {
        mHandler.post(job);
    }

    /**
     * @param intent
     */
    private void handleStart(Intent intent) {
        mEmitter.fireStarted(intent, mAccounts);
    }

    /**
     * @param intent
     */
    private void handleAccountCreate(Intent intent) {
        try {
            String username = intent.getStringExtra("username");
            String password = intent.getStringExtra("password");
            String host = intent.getStringExtra("host");
            String realm = intent.getStringExtra("realm");
            String port = intent.getStringExtra("port");
            String transport = intent.getStringExtra("transport");
            String uri = port != null && !port.isEmpty() ? host + ":" + port : host;

            // Create transport
            TransportConfig transportConfig = new TransportConfig();
            transportConfig.setQosType(pj_qos_type.PJ_QOS_TYPE_VOICE);

            pjsip_transport_type_e transportType = pjsip_transport_type_e.PJSIP_TRANSPORT_UDP;

            if (transport != null && !transport.isEmpty() && !transport.equals("TCP")) {
                switch (transport) {
                    case "UDP":
                        transportType = pjsip_transport_type_e.PJSIP_TRANSPORT_TCP;
                        break;
                    case "TLS":
                        transportType = pjsip_transport_type_e.PJSIP_TRANSPORT_TLS;
                        break;
                    default:
                        Log.w(TAG, "Illegal \""+ transport +"\" transport (possible values are UDP, TCP or TLS) use TCP instead");
                        break;
                }
            }

            int transportId = mEndpoint.transportCreate(transportType, transportConfig);

            // Create account
            AccountConfig cfg = new AccountConfig();
            cfg.setIdUri("sip:"+ username + "@" + realm);
            cfg.getRegConfig().setRegistrarUri("sip:" + uri);
            AuthCredInfo cred = new AuthCredInfo("Digest", realm, username, 0, password);
            cfg.getSipConfig().getAuthCreds().add(cred);
            cfg.getSipConfig().setTransportId(transportId);
            cfg.getMediaConfig().getTransportConfig().setQosType(pj_qos_type.PJ_QOS_TYPE_VOICE);
            cfg.getRegConfig().setRegisterOnAdd(true);

            PjSipAccount account = new PjSipAccount(this);
            account.create(cfg);

            mTrash.add(cfg);
            mTrash.add(cred);
            mTrash.add(transportConfig);

            mAccounts.add(account);
            mEmitter.fireAccountCreated(intent, account);
        } catch (Exception e) {
            Log.e(TAG, "Failed to create account", e);
            mEmitter.fireAccountCreated(intent, e);
        }
    }

    private void handleAccountDelete(Intent intent) {
        try {
            int accountId = intent.getIntExtra("account_id", -1);
            PjSipAccount account = null;

            for (PjSipAccount a : mAccounts) {
                if (a.getId() == accountId) {
                    account = a;
                    break;
                }
            }

            if (account == null) {
                throw new Exception("Account with \""+ accountId +"\" id not found");
            }

            // Remove link to account
            mAccounts.remove(account);

            // Remove account in PjSip
            account.delete();

            // -----
            mEmitter.fireIntentHandled(intent);
        } catch (Exception e) {
            Log.e(TAG, "Failed to delete account", e);
            mEmitter.fireAccountCreated(intent, e);
        }
    }
}
