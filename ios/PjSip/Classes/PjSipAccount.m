//
//  PjSipAccount.m
//  CarustoConnect
//
//  Created by Vadim Ruban on 3/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "PjSipAccount.h"
#import "pjsua.h"

@implementation PjSipAccount

+ (instancetype)itemConfig:(NSDictionary *)config {
    return [[self alloc] initWithConfig:config];
}

- (id)initWithConfig:(NSDictionary *)config {
    self = [super init];

    if (self) {
        NSString *username = @"1101";
        NSString *password = @"reruda";
        NSString *host = @"dev.carusto.com";
        NSString *realm = @"dev.carusto.com";
        NSString *cfgId = [NSString stringWithFormat:@"sip:%@@%@", username, realm];
        NSString *cfgURI = [NSString stringWithFormat:@"sip:%@", host];
        int port = 5060; // TODO: Support port in URI

        pjsua_acc_config cfg;
        pjsua_acc_config_default(&cfg);

        cfg.id = pj_str((char *) [cfgId UTF8String]);
        cfg.reg_uri = pj_str((char *) [cfgURI UTF8String]);

        pjsip_cred_info cred;
        cred.scheme = pj_str((char *) [@"digest" UTF8String]);
        cred.realm = pj_str((char *) [realm UTF8String]);
        cred.username = pj_str((char *) [username UTF8String]);
        cred.data = pj_str((char *) [password UTF8String]);
        cred.data_type = PJSIP_CRED_DATA_PLAIN_PASSWD;

        cfg.cred_count = 1;
        cfg.cred_info[0] = cred;

        // cfg.transport_id = [self initTransport];
      
        NSLog(@"cfg.transport_id %d", cfg.transport_id);

        pj_status_t status;
        pjsua_acc_id account_id;

        status = pjsua_acc_add(&cfg, PJ_TRUE, &account_id);
        if (status != PJ_SUCCESS) {
            NSLog(@"Error adding account");
        }

        self._id = account_id;
    }

    return self;
}

// TODO: Add configuration parameter for UDP/TLS
- (pjsua_transport_id)initTransport {
    pjsua_transport_id id;
    pjsua_transport_config cfg;
    pjsua_transport_config_default(&cfg);

    // Add TCP transport.
    pj_status_t status = pjsua_transport_create(PJSIP_TRANSPORT_TCP, &cfg, &id);
    if (status != PJ_SUCCESS) {
        NSLog(@"Error creating transport");
    }

    return id;
}

- (NSDictionary *)dump {
    return nil;
}


@end
