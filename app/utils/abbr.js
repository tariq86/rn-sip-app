export default function abbr(str) {
  if (str) {
    var parts = str.replace(/\s\s+/g, ' ').split(" ")

    if (parts.length > 1 && parts[0].length > 0 && parts[1].length > 0) {
      var first = parts[0][0].toUpperCase()
      var second = parts[1][0].toUpperCase()
      return first + '' + second
    } else if (parts.length == 1 && parts[0].length > 1) {
      return parts[0].substr(0, 2).toUpperCase()
    }
  }

  return "XX"
}
