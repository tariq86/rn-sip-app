package com.carusto;

import android.util.Log;
import org.pjsip.pjsua2.Call;
import org.pjsip.pjsua2.OnCallStateParam;

public class PjSipCall extends Call {

    private static String TAG = "PjSipCall";

    private PjSipAccount account;

    public PjSipCall(PjSipAccount acc, int call_id) {
        super(acc, call_id);
        this.account = acc;
    }

    public PjSipCall(PjSipAccount acc) {
        super(acc);
        this.account = acc;
    }
}
