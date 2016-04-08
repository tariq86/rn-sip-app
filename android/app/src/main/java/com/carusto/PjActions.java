package com.carusto;

import android.content.Context;
import android.content.Intent;
import com.facebook.react.bridge.ReadableMap;

public class PjActions {

    public static final String TEST = "test";

    public static final String ACTION_START = "start";
    public static final String ACTION_ACCOUNT_CREATE = "account_create";
    public static final String ACTION_ACCOUNT_DELETE = "account_delete";

    public static final String EVENT_STARTED = "com.carusto.account.started";
    public static final String EVENT_ACCOUNT_CREATED = "com.carusto.account.created";
    public static final String EVENT_REGISTRATION_CHANGED = "com.carusto.registration.changed";
    public static final String EVENT_CALL_CHANGED = "com.carusto.call.changed";
    public static final String EVENT_CALL_RECEIVED = "com.carusto.call.received";
    public static final String EVENT_HANDLED = "com.carusto.handled";

    public static Intent createAccountCreateIntent(int callbackId, ReadableMap configuration, Context context) {
        Intent intent = new Intent(context, PjSipService.class);
        intent.setAction(PjActions.ACTION_ACCOUNT_CREATE);
        intent.putExtra("callback_id", callbackId);
        intent.putExtra("username", configuration.getString("username"));
        intent.putExtra("password", configuration.getString("password"));
        intent.putExtra("host", configuration.getString("host"));
        intent.putExtra("realm", configuration.getString("realm"));

        if (intent.hasExtra("port")) {
            intent.putExtra("port", configuration.getInt("port"));
        }
        if (intent.hasExtra("transport")) {
            intent.putExtra("transport", configuration.getString("transport"));
        }

        return intent;
    }

    public static Intent createAccountDeleteIntent(int callbackId, int accountId, Context context) {
        Intent intent = new Intent(context, PjSipService.class);
        intent.setAction(PjActions.ACTION_ACCOUNT_DELETE);
        intent.putExtra("callback_id", callbackId);
        intent.putExtra("account_id", accountId);

        return intent;
    }

}
