import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  pager: {
    flex: 1
  },
  switchContainer: {
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  switchIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 8
  },
  switchIndicatorLeft: {
    marginRight: 5
  },
  switchIndicatorRight: {
    marginLeft: 5
  },
  switchActive: {
    backgroundColor: "#FFF"
  },
  actionsRow: {
    flex: 1,
    flexDirection: 'row'
  },
  actionsPadding: {
    flex: 0.15
  },
  actionsContent: {
    flex: 0.7
  },
  actionsContentWrapper: {
    flexDirection: 'row'
  },
  actionsContentSecondWrapper: {
    flexDirection: 'row',
    marginTop: 30
  },
  actionSeparator: {
    flex: 0.3
  },
  actionEmpty: {
    width: 64
  }
})
