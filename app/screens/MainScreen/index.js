import React, { Component, PropTypes } from 'react';
import {Text, View, StatusBar, TouchableHighlight, Navigator} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'

import CallScreen from '../CallScreen'
import DialerScreen from '../DialerScreen'
import LaunchScreen from '../LaunchScreen'

import AccountScreen from '../AccountScreen'
import NetworkSettingsScreen from '../NetworkSettingsScreen'
import MediaSettingsScreen from '../MediaSettingsScreen'

import Viewport from '../../components/Viewport'

class App extends Component {

    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid
    }

    renderScene(route, navigator) {
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
            case 'network_settings':
                return (<NetworkSettingsScreen />);
            case 'media_settings':
                return (<MediaSettingsScreen />);
            default:
                return (<TodoScreen />);
        }
    }

    componentDidMount() {
        this.props.onNavigatorMount && this.props.onNavigatorMount(this.refs.navigator);
    }

    render() {
        const {navigation} = this.props;
        const full = navigation.current.name == "call";
        const barColor = "#36454b";
        const barStyle = "light-content";
        const route = navigation.current.name ? navigation.current : navigation.init;

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={barColor}
                    barStyle={barStyle}
                    hidden={full}
                />
                <Navigator
                    style={{flex: 1}}
                    ref="navigator"
                    initialRoute={route}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene.bind(this)} />
            </View>
        )
    }
}

App.propTypes = {
    navigation: PropTypes.object
};

function select(store) {
    return {
        navigation: store.navigation
    };
}

function actions(dispatch) {
    return {
        onNavigatorMount: (ref) => {
            dispatch(Navigation.ref(ref));
        }
    };
}

export default connect(select, actions)(App)
