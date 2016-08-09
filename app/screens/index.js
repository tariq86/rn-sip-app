import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Navigator
} from 'react-native'

import {init} from '../modules/app'
import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'

import LaunchScreen from './LaunchScreen'
import AccountScreen from './AccountScreen'
import NewAccountScreen from './NewAccountScreen'
import HomeScreen from './HomeScreen'
import DailerScreen from './DailerScreen'
import CallScreen from './CallScreen'
import NavigationStyles from '../styles/common/NavigationStyles'

//import SearchScreen from './SearchScreen'
//import UserScreen from './UserScreen'
//import Drawer from './Drawer'

// this need for passing navigator instance to navigation module
export let nav;

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return;
        }

        return (
            <TouchableHighlight onPress={() => navigator.pop()}>
                <View style={{height: 56, justifyContent: 'center'}}>
                    <Text style={[NavigationStyles.navBarText]}>
                        Back
                    </Text>
                </View>
            </TouchableHighlight>
        )
    },

    RightButton: function(route, navigator, index, navState) {
        return null;
    },

    Title: function(route, navigator, index, navState) {
        let title = route.title ? route.title : "Example";

        return (
            <View style={{height: 56, justifyContent: 'center', alignSelf: 'center', marginLeft: -72}}>
                <Text style={[NavigationStyles.navBarText, NavigationStyles.navBarTitleText]}>
                    {title}
                </Text>
            </View>
        );
    }
};



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
            case 'home':
                return (<HomeScreen />);
            case 'account':
                return (<AccountScreen />);
            case 'new_account':
                return (<NewAccountScreen />);
            case 'dailer':
                return (<DailerScreen />);
            case 'call':
                return (<CallScreen />);
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

        console.log("render", this.props);

        if (navigation.current && navigation.current.name == 'call') {
            return (
                <Navigator
                    style={{flex: 1}}
                    ref={ref => nav = ref}
                    initialRoute={navigation.init}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene.bind(this)}
                />
            )
        } else {
            return (
                <Navigator
                    style={{flex: 1, paddingTop: 56}}
                    ref={ref => nav = ref}
                    initialRoute={navigation.init}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene.bind(this)}
                    navigationBar={
                    <Navigator.NavigationBar
                      routeMapper={NavigationBarRouteMapper}
                      style={NavigationStyles.navBar}
                    />
                } />
            )
        }
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
