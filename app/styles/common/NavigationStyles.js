import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CDCDCD'
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500'
    },
    navBar: {
        // alignItems: 'stretch',
        // justifyContent: 'center',
        backgroundColor: '#5094e4'
    },
    navBarText: {
        fontSize: 16
    },
    navBarTitleText: {
        color: '#FFF',
        fontWeight: '500'
    },
    navBarLeftButton: {
        paddingLeft: 10
    },
    navBarRightButton: {
        paddingRight: 10
    },
    navBarButtonText: {
        color: '#5890FF'
    }
});

export default styles
