import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeCall} from '../../modules/pjsip'

import KeypadWithActions from '../../components/Call/KeypadWithActions'
import cs from '../../assets/styles/containers'

const DialerViewport = ({onCallPress}) => {
  return (
    <KeypadWithActions
      style={cs.max}
      actions={[
        {icon: "message", text: "Chat", callback: () => {}},
        {icon: "call", text: "Call", callback: onCallPress},
        {icon: "fax", text: "Video", callback: () => {}}
      ]}
    />
  )
}

DialerViewport.propTypes = {
  onCallPress: PropTypes.func.isRequired
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onCallPress: (destination) => {
      if (destination) {
        dispatch(makeCall(destination))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerViewport)
