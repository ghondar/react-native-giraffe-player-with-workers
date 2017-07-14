package com.giraffetestreact;

import android.os.Bundle;
import android.os.StrictMode;

import com.fabricio.vergal.RNWorkers.RNWorkersManager;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "giraffeTestReact";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        //CRITICAL: Must be started before super.onCreate to be possible to debug on chrome console
        RNWorkersManager.getInstance().startWorkers();
        super.onCreate(savedInstanceState);
    }
}
