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

type CheckUpdateReturn = {
  hasUpdate: 0 | 1;
  clientVersionStaleness?: number;
};
export function checkAppUpdate(): Promise<CheckUpdateReturn> {
  return AppUpdateDetect.checkIfHasUpdate();
}
