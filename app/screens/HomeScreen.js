import React, {
    Component,
    PropTypes,
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

    render() {
        const {dispatch, accounts} = this.props;
        
        if (accounts.length > 0) {
            return (
                <View style={s.listContainer}>
                    <AccountsList accounts={accounts} onPress={(account) => dispatch(Navigation.goTo({name: 'account', account, title: account.getURI()}))} />
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
    const {accounts} = state;

    return {
        accounts: _.values(accounts.map)
    }
}

export default connect(mapStateToProps)(HomeScreen)
