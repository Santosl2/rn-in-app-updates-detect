package com.appupdatedetect;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.gms.tasks.Task;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;

@ReactModule(name = AppUpdateDetectModule.NAME)
public class AppUpdateDetectModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AppUpdateDetect";
  private AppUpdateManager appUpdateManager = null;

  public AppUpdateDetectModule(ReactApplicationContext reactContext) {
    super(reactContext);
    appUpdateManager = AppUpdateManagerFactory.create(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a + b);
  }

  @ReactMethod
  public void checkIfHasUpdate(Promise promise){
    Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();

    appUpdateInfoTask.addOnFailureListener(err -> {
      promise.reject("Exception", err.toString());
    });

    appUpdateInfoTask.addOnSuccessListener(appUpdateInfo ->
    {
      WritableMap map = Arguments.createMap();
      Integer clientVersionStaleness = appUpdateInfo.clientVersionStalenessDays();
      map.putInt("hasUpdate", appUpdateInfo.updateAvailability());

      if(clientVersionStaleness != null){
        map.putInt("clientVersionStaleness", clientVersionStaleness);
      }

      promise.resolve(map);

    });
  }
}
