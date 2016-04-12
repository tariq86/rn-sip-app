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
import ButtonStyles from '../styles/common/ButtonStyles'

class CallScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const {dispatch, call} = this.props;

        return (
            <View style={{flex: 1, padding: 20, backgroundColor: "#CCC"}}>
                <Text>Call screen</Text>
            </View>
        )
    }
}

CallScreen.propTypes = {
    dispatch: PropTypes.func,
    call: PropTypes.object
};


function mapStateToProps(state) {
    const {current} = state.navigation;
    return {
        call: current.call
    }
}

export default connect(mapStateToProps)(CallScreen)