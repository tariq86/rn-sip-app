import React, {
    Component,
    PropTypes,
    Text,
    TextInput,
    View
} from 'react-native'
import TextInputStyles from '../styles/common/TextInputStyles'

export default class AccountConfiguration extends Component {

    handleInputChange(name, value) {
        console.log("handleInputChange", value);

        if (this.props.onChange) {
            this.props.onChange(this.props.configuration ? {
                ...this.props.configuration,
                [name]: value
            } : {
                [name]: value
            });
        }
    }

    render() {
        const {configuration} = this.props;

        return (
            <View>
                <View style={{marginTop: 10}}>
                    <Text style={TextInputStyles.label}>Username</Text>
                    <View style={TextInputStyles.wrapper}>
                        <TextInput
                            style={TextInputStyles.input}
                            value={configuration ? configuration.username : ''}
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleInputChange.bind(this, "username")} />
                    </View>
                </View>

                <View style={{marginTop: 10}}>
                    <Text style={TextInputStyles.label}>Password</Text>
                    <View style={TextInputStyles.wrapper}>
                        <TextInput
                            style={TextInputStyles.input}
                            value={configuration ? configuration.password : ''}
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleInputChange.bind(this, "password")} />
                    </View>
                </View>

                <View style={{marginTop: 10}}>
                    <Text style={TextInputStyles.label}>Host</Text>
                    <View style={TextInputStyles.wrapper}>
                        <TextInput
                            style={TextInputStyles.input}
                            value={configuration ? configuration.host : ''}
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleInputChange.bind(this, "host")} />
                    </View>
                </View>

                <View style={{marginTop: 10}}>
                    <Text style={TextInputStyles.label}>Realm</Text>
                    <View style={TextInputStyles.wrapper}>
                        <TextInput
                            style={TextInputStyles.input}
                            value={configuration ? configuration.realm : ''}
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleInputChange.bind(this, "realm")} />
                    </View>
                </View>
            </View>
        )
    }
}

AccountConfiguration.propTypes = {
    configuration: PropTypes.object,
    onChange: PropTypes.func
};
