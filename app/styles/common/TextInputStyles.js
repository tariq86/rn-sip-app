import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#424242',
        padding: 4,
        paddingLeft: 6,
        paddingRight: 6
    },
    input: {
        height: 35,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    label: {
        paddingTop: 5,
        paddingBottom: 5,
        color: "#666"
    }
})

export default styles
