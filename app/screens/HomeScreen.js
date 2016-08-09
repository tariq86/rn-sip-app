import React, { Component, PropTypes} from 'react';
import {
    TouchableHighlight,
    StatusBar,
    Text,
    Image,
    View
} from 'react-native'
import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'
import ButtonStyles from '../styles/common/ButtonStyles'
import s from '../styles/screens/HomeScreenStyles'
import AccountsList from '../components/AccountsList'

/**
 * Represent a view that shows available accounts to User.
 */
class HomeScreen extends Component {


    renderCalls(dispatch, calls) {
        let views = [];

        for (let call of calls) {
            views.push((
                <TouchableHighlight key={call.get('id')} onPress={() => dispatch(Navigation.goTo({name: 'call', call}))}>
                    <View style={{borderRadius: 16, backgroundColor: "#CCC", paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, justifyContent: 'center'}}>
                        <Text style={{color: "#424242"}}>Call #{call.get('id')}</Text>
                    </View>
                </TouchableHighlight>
            ));
        }

        return views;
    }

    render() {
        const {dispatch, accounts, calls} = this.props;
        
        if (accounts.length > 0 || calls.length > 0) {
            return (
                <View style={s.listContainer}>
                    <AccountsList accounts={accounts} onPress={(account) => dispatch(Navigation.goTo({name: 'account', account, title: account.get('uri')}))} />

                    <View style={{bottom: 15, right: 15, alignSelf: 'flex-end', alignItems: 'flex-end', flex: 0}}>
                        {
                            this.renderCalls(dispatch, calls)
                        }
                        <View style={{flexDirection: 'row'}}>
                            <TouchableHighlight onPress={() => dispatch(Navigation.goTo({name: 'dailer'}))}>
                                <View style={{borderRadius: 52, backgroundColor: "#1898e7", width: 52, height: 52, justifyContent: 'center'}}>
                                    <Text style={{alignSelf: 'center', color: "#FFF"}}>Call</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => dispatch(Navigation.goTo({name: 'new_account'}))}>
                                <View style={{borderRadius: 52, backgroundColor: "#e76618", width: 52, height: 52, justifyContent: 'center'}}>
                                    <Text style={{alignSelf: 'center', color: "#FFF"}}>Acc</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={s.emptyContainer}>
                    <Text style={s.empty}>No active accounts</Text>
                    <TouchableHighlight style={{marginTop: 30}} onPress={() => dispatch(Navigation.goTo({name: 'new_account'}))}>
                        <View style={ButtonStyles.actionButtonWithPadding}>
                            <Text pointerEvents="none" style={ButtonStyles.text}>
                                Add account
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

HomeScreen.propTypes = {
    accounts: PropTypes.array,
    dispatch: PropTypes.func
};

function mapStateToProps(state) {
    return {
        accounts: state.accounts.map.toArray(),
        calls: state.calls.map.toArray()
    }
}

export default connect(mapStateToProps)(HomeScreen)
