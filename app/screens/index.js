import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Navigator,
    Modal
} from 'react-native'

import {init} from '../modules/app'
import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'

import CallScreen from './calls/CallScreen'
import DialerScreen from './dialer/DialerScreen'
import TestScreen from './TestScreen'
import LaunchScreen from './LaunchScreen'

import AccountScreen from './settings/AccountScreen'

import Viewport from '../components/Viewport'

// this need for passing navigator instance to navigation module
export let nav;

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;

        // init application
        dispatch(init());
    }

    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid
    }

    renderScene(route, navigator) {
        const {dispatch} = this.props;

        switch (route.name) {
            case 'launch':
                return (<LaunchScreen />);
            case 'conversations':
            case 'contacts':
            case 'history':
            case 'settings':
            case 'dialer':
                return (
                    <Viewport navigator={navigator} />
                );
            case 'call':
                return (<CallScreen />);
            case 'account':
                return (<AccountScreen />);
            case 'test':
                return (<TestScreen />);
            default:
                return (
                    <View>
                        <Text>Default scene</Text>
                        <TouchableHighlight onPress={() => dispatch(Navigation.goTo({name: 'home'}))}>
                            <Text>Go to home screen</Text>
                        </TouchableHighlight>
                    </View>
                );
        }
    }

    render() {
        const {navigation} = this.props;

        return (
            <Navigator
                style={{flex: 1}}
                ref={ref => nav = ref}
                initialRoute={navigation.init}
                configureScene={this.configureScene}
                renderScene={this.renderScene.bind(this)}
            />
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object
};

function mapStateToProps(state) {
    return {
        navigation: state.navigation
    }
}

export default connect(mapStateToProps)(App)
