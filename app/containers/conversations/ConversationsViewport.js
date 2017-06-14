import React from 'react'
import {Image, View, Text, Platform} from 'react-native'
import {connect} from 'react-redux'

const HistoryViewport = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#ECEFF1",
        justifyContent: 'center',
        paddingBottom: (Platform.OS === 'ios' ? 50 : 0)
      }}
    >
      <Text style={{fontSize: 42, marginTop: 26, color: "#666"}}>Bonjour!</Text>
      <Image resizeMode="contain" style={{width: 250}} source={require('../../assets/demo/oviraptor.png')}/>
    </View>
  )
}

HistoryViewport.propTypes = {

}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryViewport)
