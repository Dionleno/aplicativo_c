//
//  AdyenIos.m
//  appWithRedux
//
//  Created by Teste T.I. on 12/03/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AdyenCSE/AdyenCSE.h"
#import "AdyenIOS.h"
#import <React/RCTLog.h>

@implementation AdyenIOS

RCT_EXPORT_MODULE(AdyenIOS);

RCT_REMAP_METHOD(findEvents,
                  keyitem:(NSString *)keyitem
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{

    NSString *Item = keyitem;
     resolve(Item);

 
  //RCTLogInfo(@"Pretending to create an event %@ ",keyitem);
}

//exports a method getDeviceName to javascript
RCT_REMAP_METHOD(generateCSE,
                  publicKey:(NSString *)publicKey
                  name:(NSString *)holderName
                  number:(NSString *)number
                  cvc:(NSString *)cvc
                  expiryMonth:(NSString *)expiryMonth
                  expiryYear:(NSString *)expiryYear
                  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                 ){
  
  @try{
    
    
    // Set the public key.
    NSString *publicKeyHex = @"10001|A183C80FDF1F8B4DA46EE1F5AC955EAFDC9B9B6CE49CB0FF52BC6FBD0A91694E501CC3051827D4BF901120BC1CF76266B407F7CC1D0E4F47A62951F306E046D7DCFA6AD6756FB2770C5802A9C1460CA265B0F590B74C1B7A82D0B7490C358406950568840C71AA30D93CF1AF77B97ECE38E761CBFE0025FA7D2A3AE9F1FF4D214E2C55717D6CF2AE1FF4570E8D8C02A7E73D1542CE087A34C8C4BDA4F773372AB6184BF3A174B2E47C0A10E10D3DE042A612BD899CE73AB528B99870AD29695965CF20E60BFA01800D7C95BB1732C27C0103C12E19AE9794721E94F3A38071FDD319852261C2952A384C3D7B25AA7CA53E27361EF9631938790F817B54AD3E8F";
    
    
    // Create a card object.
    ADYCard *card = [ADYCard new];
    card.generationtime = [NSDate new];
    card.number = number ;
    card.holderName = holderName;
    card.cvc = cvc;
    card.expiryMonth = expiryMonth;
    card.expiryYear = expiryYear;
    
    RCTLogInfo(@"Pretending to create an event %@ ",card);
    // Encrypt card data.
    NSData *cardData = [card encode];
    NSString *encryptedCard = [ADYEncrypter encrypt:cardData publicKeyInHex:publicKeyHex];
    NSDictionary *dict = @{@"response" : encryptedCard};
    resolve(dict);
  }
  @catch(NSError *exception){
    NSError *error = exception;
    reject(@"no_events", @"There were no events",error);
    //Console.error(exception);
  }
}


@end
