import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-app-update-detect' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AppUpdateDetect = NativeModules.AppUpdateDetect
  ? NativeModules.AppUpdateDetect
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

enum UpdateAvailability {
  UNKNOWN = 0,
  UPDATE_NOT_AVAILABLE = 1,
  UPDATE_AVAILABLE = 2,
}

type CheckUpdateReturn = {
  hasUpdate: UpdateAvailability;
  clientVersionStaleness?: number;
};
export function checkAppUpdate(): Promise<CheckUpdateReturn> {
  return AppUpdateDetect.checkIfHasUpdate();
}
