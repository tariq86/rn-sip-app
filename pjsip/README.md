#Overview

Principles:
- All data is immutable
- Use promise
- Application that use library should care about data persistance (e.g. save active calls and accounts information in theirs store)


# Getting started


### Initialize PjSip module

To start working with library, first you should load and initialize PjSip module.
It is possible that module will be initialized many times, as much as React Native context will be created.
(e.g. your application lost state after going to background)

```
let endpoint = new Endpoint();
endpoint.initialized().then((activeAccounts, activeCalls) => {
    // Active calls and accounts will be returned.
    // 
});
```
> Usually `activeAccounts` and `activeCalls` are empty arrays, but when your application goes to background mode "React Native context" could be refreshed and you lost all information about PjSip library state.
> So you should properly handle activeAccounts and activeCalls on startup (e.g. show interface for controlling active calls) 

### Create account
Accounts object are just Immutable Js records, with some actions that interact PjSip module.

```
let configuration = new AccountConfig({
    username: "username",
    password: "password",
    host: "sip.server.com",
    port: 5060,
    transport: "TCP"
});

endpoint.createAccount(configuration).then((account) => {
    console.log("account uri", account.getURI()); // username@domain.com
    console.log("account registration", account.getRegistration());
});
```
> When creating an account PjSip module will automatically trigger Register method, if you don't need registration on server set `registration` to false in Account configuration

### Make call

```
let to = "sip:1000@sip.server.com";

account.makeCall(to).then((call) => {
    console.log("state", call.getState());
    
    call.hangup().then((call) => {
        // Display final call information
    });
});

```



### Handle Account events

```
endpoint.on("registration_changed", (account) => {
    console.log("account with id", account.getId(), "have new registration state", account.getRegistration());
});


```


# Advanced settings

## Codecs configuration


#Building from sources
