import React, {AppRegistry} from 'react-native'
import CarustoConnect from './app'


import {
    Endpoint
} from './pjsip'


//Endpoint.start().then(
//    (result)=> console.log("Endpoint.start().then", result)
//);

// Endpoint.createAccount({
//     username: '11012'
// }).then(()=> {
//     console.log("Endpoint.createAccount().then", arguments)
// });


AppRegistry.registerComponent('CarustoConnect', () => CarustoConnect);
