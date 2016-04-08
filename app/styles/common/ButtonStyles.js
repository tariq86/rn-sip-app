import {StyleSheet} from 'react-native'

const button = {
    height: 35,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#859197",
    elevation: 4
};
const actionButton = {
    ...button,
    backgroundColor: "#5094e4"
};

const actionButtonDisabled = {
    ...actionButton,
    backgroundColor: "#b0bbc9"
};

const styles = StyleSheet.create({
    button,
    actionButton,
    actionButtonDisabled,
    actionButtonWithPadding: {
        ...actionButton,
        paddingLeft: 10,
        paddingRight: 10
    },
    actionButtonWithPaddingDisabled: {
        ...actionButtonDisabled,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: "#FFF"
    }
});

export default styles