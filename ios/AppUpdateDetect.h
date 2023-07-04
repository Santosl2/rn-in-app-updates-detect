
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAppUpdateDetectSpec.h"

@interface AppUpdateDetect : NSObject <NativeAppUpdateDetectSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AppUpdateDetect : NSObject <RCTBridgeModule>
#endif

@end
