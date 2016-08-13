import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    View
} from 'react-native'
import {connect} from 'react-redux'
import ButtonStyles from '../../styles/common/ButtonStyles'
import {deleteAccount} from '../../modules/accounts'


class AccountScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            usernameValid: false,
            password: '',
            passwordValid: false,
            host: '',
            hostValid: false,
            realm: '',
            realmValue: false
        }
    }

    handleInputChange(name, e) {
        let value = e.nativeEvent.text;
        let valid = true;

        if (value == null || value.length == 0) {
            valid = false;
        }

        this.setState({
            [name]: value,
            [name + "Valid"]: valid
        })
    }

    handleSubmit() {
        if (!this.state.usernameValid ||
            !this.state.passwordValid ||
            !this.state.hostValid ||
            !this.state.realmValue){
            return;
        }


        // TODO: Dispatch EVENT account_create with specified configuration.
        // Also show loader.
    }

    render() {
        const {dispatch, account} = this.props;

        return (
            <View style={{padding: 20}}>
                <Text>Account screen</Text>
                <TouchableHighlight style={{marginTop: 30}} onPress={() => dispatch(deleteAccount(account))}>
                    <View style={ButtonStyles.actionButtonWithPadding}>
                        <Text pointerEvents="none" style={ButtonStyles.text}>
                            Delete
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

AccountScreen.propTypes = {
    dispatch: PropTypes.func,
    account: PropTypes.object
};


function mapStateToProps(state) {
    const {current} = state.navigation;
    return {
        account: current.account
    }
}

export default connect(mapStateToProps)(AccountScreen)