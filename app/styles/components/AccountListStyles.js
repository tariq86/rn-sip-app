import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    row: {
        alignItems: 'stretch',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: "#cedff4",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 12
    },
    rowCircle: {
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: "#687c94",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    rowCircleText: {
        fontSize: 22,
        color: '#333'
    },
    rowDescription: {
        flex: 1,
        height: 48,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rowURIText: {
        fontSize: 16,
        color: '#424242'
    },
    rowRegistrationText: {
        fontSize: 12,
        color: '#424242',
        paddingTop: 10
    }
});


export default styles