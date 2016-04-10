//
//  PjSipEndpoint.h
//  CarustoConnect
//
//  Created by Vadim Ruban on 3/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PjSipAccount.h"
#import "PjSipCall.h"

@interface PjSipEndpoint : NSObject
@property NSDictionary* accounts;

+(instancetype)instance;
-(void)start:(NSDictionary *)config;
-(PjSipAccount *)createAccount:(NSDictionary*)config;

@end
