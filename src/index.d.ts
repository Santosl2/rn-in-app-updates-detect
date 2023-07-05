declare module 'rn-in-app-updates-detect' {
  type CheckUpdateReturn = {
    hasUpdate: boolean;
    clientVersionStaleness?: number;
  };
  export function checkAppUpdate(): Promise<CheckUpdateReturn>;
}
