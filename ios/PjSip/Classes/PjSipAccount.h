//
//  PjSipAccount.h
//  CarustoConnect
//
//  Created by Vadim Ruban on 3/25/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "PjSipCall.h"

@interface PjSipAccount : NSObject
@property int _id;

// -(void) change: (NSDictionary *) configuration;
// -(PjSipCall *) makeCall: (NSDictionary *) configuration;

+(instancetype)itemConfig:(NSDictionary*)config;
-(id)initWithConfig:(NSDictionary*)config;

-(NSDictionary *) dump;

@end
