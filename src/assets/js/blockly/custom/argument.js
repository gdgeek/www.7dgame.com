function number(value) {
  return '_G.helper.argument_number(' + value + ')'
}

function string(value) {
  return '_G.helper.argument_string(' + value + ')'
}

function player(value) {
  return '_G.helper.argument_player(' + value + ')'
}

function anchor(key) {
  return "_G.helper.argument_anchor('" + key + "')"
}
function range(anchor, radius) {
  return '_G.helper.argument_range(' + anchor + ', ' + radius + ')'
}
module.exports = {
  number,
  string,
  range,
  anchor,
  player
}
