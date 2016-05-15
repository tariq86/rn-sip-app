import React, {
    Component,
    PropTypes,
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    View
} from 'react-native'
import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'
import ButtonStyles from '../styles/common/ButtonStyles'
import AccountConfiguration from '../components/AccountConfiguration'
import {createAccount} from '../modules/accounts'

class NewAccountScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            configuration: {
                username: '100',
                password: 'test',
                host: '192.168.1.250',
                realm: 'local.carusto.com'
            },
            configurationValid: true
        }
    }

    handleConfigurationChange(config) {
        var valid = true;

        for (var key of ['username', 'password', 'host', 'realm']) {
            if (!config[key] || config[key].lenght == 0) {
                valid = false;
                break;
            }
        }

        this.setState({
            configuration: config,
            configurationValid: valid
        })
    }

    handleSubmit() {
        if (!this.state.configurationValid) {
            return;
        }

        this.props.dispatch(createAccount(this.state.configuration));
    }

    render() {
        const {dispatch} = this.props;
        return (
            <View style={{padding: 20}}>
                <AccountConfiguration configuration={this.state.configuration} onChange={this.handleConfigurationChange.bind(this)} />

                <TouchableHighlight style={{marginTop: 30}} onPress={this.handleSubmit.bind(this)}>
                    <View style={this.state.configurationValid ? ButtonStyles.actionButton : ButtonStyles.actionButtonDisabled}>
                        <Text pointerEvents="none" style={ButtonStyles.text}>
                            Submit
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

NewAccountScreen.propTypes = {
    dispatch: PropTypes.func
};

export default connect()(NewAccountScreen)
