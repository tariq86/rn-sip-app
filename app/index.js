import React, { Component } from 'react';
import {Provider} from 'react-redux'
import configureStore from './configureStore'

import MainScreen from './screens/MainScreen'

const store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainScreen />
            </Provider>
        )
    }
}

export default Root
