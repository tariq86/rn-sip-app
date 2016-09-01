import React, { Component } from 'react';
import {StatusBar, View} from 'react-native'
import {Provider} from 'react-redux'
import configureStore from './configureStore'

import App from './screens'

const store = configureStore();

// TODO: Hide Status bar when App is full screen!

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor="#CCCCCC"
                        barStyle="light-content"
                        hidden={false} />
                    <App />
                </View>
            </Provider>
        )
    }
}

export default Root
