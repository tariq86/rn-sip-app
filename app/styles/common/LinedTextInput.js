import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: '#A9AFB2'
    },
    wrapperWithOffset: {
        marginLeft: 10,
        marginRight: 10
    },
    wrapperActive: {
        borderColor: '#59ACFA'
    },
    input: {
        flex: 1,
        height: 38,
        backgroundColor: "transparent",
        fontSize: 13,
        padding: 4,
        paddingLeft: 10,
        paddingRight: 16
    },
    inputWithOffset: {
        paddingLeft: 0
    },
    clear: {
        width: 20,
        height: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#E0E7EA',
        position: "absolute",
        right: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles