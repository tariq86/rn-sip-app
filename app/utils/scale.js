import {
  PixelRatio,
  Dimensions
} from 'react-native'


function float2int(value) {
  return value | 0
}

export function correctFontSizeForScreen(size) {
  const {height: screenHeight, width: screenWidth} = Dimensions.get('window')
  const devRatio = PixelRatio.get()
  const factor = (((screenWidth * devRatio) / 320) + ((screenHeight * devRatio) / 640)) / 2.0
  const maxFontDifferFactor = 5 //the maximum pixels of font size we can go up or down
  // console.log("The factor is: "+factor);
  if (factor <= 1) {
    return size - float2int(maxFontDifferFactor * 0.3)
  } else if ((factor >= 1) && (factor <= 1.6)) {
    return size - float2int(maxFontDifferFactor * 0.1)
  } else if ((factor >= 1.6) && (factor <= 2)) {
    return size
  } else if ((factor >= 2) && (factor <= 3)) {
    return size + float2int(maxFontDifferFactor * 0.65)
  } else if (factor >= 3) {
    return size + float2int(maxFontDifferFactor)
  }
}
