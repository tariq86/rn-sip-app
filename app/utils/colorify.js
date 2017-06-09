export default function colorify(str) {
  var hash = 0,
    rgb = [],
    i

  for (i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (i = 0; i < 3; i++) {
    rgb[i] = ((hash >> (i * 8)) & 0xFF)
    rgb[i] = Math.ceil((rgb[i] + 255) / 2)
  }

  var min = Math.min.apply(null, rgb)
  var max = Math.max.apply(null, rgb)

  rgb[rgb.indexOf(min)] = 100
  rgb[rgb.indexOf(max)] = Math.ceil(max > 180 ? max / 2 : (max + 255) / 2)

  for (i = 0; i < 3; i++) {
    rgb[i] = ('00' + rgb[i].toString(16)).substr(-2)
  }

  return "#" + rgb.join("")
}
