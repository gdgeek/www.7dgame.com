function handler(index, uuid) {
  return "_G.helper.handler('" + index + "', '" + uuid + "')"
}
function input_event(index, uuid) {
  return "_G.helper.input_event('" + index + "', '" + uuid + "')"
}
function output_event(index, uuid) {
  return "_G.helper.output_event('" + index + "', '" + uuid + "')"
}
function parameter(type, uuid) {
  return "_G.helper.parameter('" + type + "', '" + uuid + "')"
}
function range(anchor, radius) {
  return '_G.helper.range(' + anchor + ', ' + radius + ')'
}
module.exports = {
  handler,
  input_event,
  output_event,
  parameter,
  range
}
