function number(value) {
  return '_G.argument.number(' + value + ')'
}

function string(value) {
  return '_G.argument.string(' + value + ')'
}

function player(value) {
  return '_G.argument.player(' + value + ')'
}

function anchor(key) {
  return "_G.argument.anchor('" + key + "')"
}
function range(anchor, radius) {
  return '_G.argument.range(' + anchor + ', ' + radius + ')'
}
module.exports = {
  number,
  string,
  range,
  anchor,
  player
}
