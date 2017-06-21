import React  from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import colorify from '../../../utils/colorify'
import abbr from '../../../utils/abbr'
import s from './styles'

const ListAccountInfo = ({style, account, connectivity, onPress}) => {
  const acc = account
  const registration = acc.getRegistration()

  const accountColor = colorify(acc.getURI())
  const presenceColor = registration.isActive() && registration.getStatusText() === "OK" ? "#34D023" : "#CCC"
  let status = registration.getStatusText()

  if (connectivity === false) {
    status = "No connectivity or Limited"
  }

  return (
    <TouchableOpacity onPress={onPress} style={[s.container, style]}>
      <View style={[s.abbrContainer, {backgroundColor: accountColor}]}>
        <Text style={s.abbrText}>{abbr(acc.getName())}</Text>
        <View style={[s.abbrPresence, {backgroundColor: presenceColor}]}/>
      </View>

      <View style={s.infoContainer}>
        <Text style={s.infoTitle} numberOfLines={1} ellipsizeMode="middle">{acc.getURI()}</Text>
        <Text style={s.infoStatus}>{status}</Text>
      </View>

      <View style={s.goContainer}>
        <Image source={require('../../../assets/images/common/lined-goto.png')}/>
      </View>
    </TouchableOpacity>
  )
}

ListAccountInfo.propTypes = {
  style: View.propTypes.style,
  account: PropTypes.object,
  connectivity: PropTypes.bool,
  onPress: PropTypes.func
}

export default ListAccountInfo
