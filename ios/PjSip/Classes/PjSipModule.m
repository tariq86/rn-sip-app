//
//  WebRTCModule.m
//
//  Created by one on 2015/9/24.
//  Copyright © 2015 One. All rights reserved.
//

#import "PjSipEndpoint.h"
#import "PjSipModule.h"

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"

@interface PjSipModule ()

@end

@implementation PjSipModule

@synthesize bridge = _bridge;

- (instancetype)init
{
  self = [super init];
  NSLog(@"PjSipModule init");

  return self;
}

RCT_EXPORT_METHOD(createEndpoint:(NSDictionary *)config callback:(RCTResponseSenderBlock)callback)
{
  [[PjSipEndpoint instance] start:config];
  callback(@[@"success"]);
}

RCT_EXPORT_METHOD(createAccount:(NSDictionary *)config callback:(RCTResponseSenderBlock)callback)
{
  PjSipAccount* account = [[PjSipEndpoint instance] createAccount:config];
  [account dump]; // TODO: Return account data in response

  callback(@[[NSNull null], @"Account data response"]);
}

RCT_EXPORT_MODULE();

// - (dispatch_queue_t)methodQueue
// {
//   return dispatch_get_main_queue();
// }

@end