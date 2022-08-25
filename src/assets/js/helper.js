
function printVector3(vec) {
  return '(' + vec.x + ', ' + vec.y + ', ' + vec.z + ')'
}
function printVector2(vec) {
  return '(' + vec.x + ', ' + vec.y +')'
}
function cutString(str, len) {
  if (str.length * 2 <= len) {
    return str
  }
  var strlen = 0
  var s = ''
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i)
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + '...'
      }
    } else {
      strlen = strlen + 1
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + '...'
      }
    }
  }
  return s
}

export { printVector3, printVector2, cutString }
