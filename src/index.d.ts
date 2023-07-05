declare module 'rn-in-app-updates-detect' {
  type UpdateAvailability = {
    UNKNOWN: 0;
    UPDATE_NOT_AVAILABLE: 1;
    UPDATE_AVAILABLE: 2;
  };
  type CheckUpdateReturn = {
    hasUpdate: UpdateAvailability;
    clientVersionStaleness?: number;
  };
  export function checkAppUpdate(): Promise<CheckUpdateReturn>;
}
