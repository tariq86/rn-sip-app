//
//  PjSipEndpoint.m
//  CarustoConnect
//
//  Created by Vadim Ruban on 3/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "PjSipEndpoint.h"
#import "pjsua.h"

@implementation PjSipEndpoint

+ (instancetype)instance
{
  static PjSipEndpoint *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
      sharedInstance = [[PjSipEndpoint alloc] init];
  });

  return sharedInstance;
}

- (instancetype)init
{
  self = [super init];
  pj_status_t status;
  
  // Create pjsua first
  status = pjsua_create();
  if (status != PJ_SUCCESS) {
    NSLog(@"Error in pjsua_create()");
  }
  
  // Init pjsua
  {
    // Init the config structure
    pjsua_config cfg;
    pjsua_config_default (&cfg);

    // Init the logging config structure
    pjsua_logging_config log_cfg;
    pjsua_logging_config_default(&log_cfg);
    log_cfg.console_level = 4;

    // Init the pjsua
    status = pjsua_init(&cfg, &log_cfg, NULL);
    if (status != PJ_SUCCESS) {
      NSLog(@"Error in pjsua_init()");
    }
  }
  
  // Add UDP transport.
  {
    // Init transport config structure
    pjsua_transport_config cfg;
    pjsua_transport_config_default(&cfg);
    cfg.port = 5080;
    
    // Add TCP transport.
    status = pjsua_transport_create(PJSIP_TRANSPORT_UDP, &cfg, NULL);
    if (status != PJ_SUCCESS) NSLog(@"Error creating transport");
  }
  
  // Add TCP transport.
  {
    // Init transport config structure
    pjsua_transport_config cfg;
    pjsua_transport_config_default(&cfg);
    cfg.port = 5080;
    
    // Add TCP transport.
    status = pjsua_transport_create(PJSIP_TRANSPORT_TCP, &cfg, NULL);
    if (status != PJ_SUCCESS) NSLog(@"Error creating transport");
  }

  // Initialization is done, now start pjsua
  status = pjsua_start();
  if (status != PJ_SUCCESS) NSLog(@"Error starting pjsua");
  
  return self;
}

- (void)start:(NSDictionary *)config {
  NSLog(@"Make configuration that set for example user agent and other data");
}

-(PjSipAccount *) createAccount: (NSDictionary*)config {
  PjSipAccount* account = [PjSipAccount itemConfig:config];
  return account;
}





@end
