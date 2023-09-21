function handler(index, uuid) {
  return "_G.helper.handler('" + index + "', '" + uuid + "')"
}
function input_event(index, uuid) {
  return "_G.helper.input_event('" + index + "', '" + uuid + "')"
}
function output_event(index, uuid) {
  return "_G.helper.output_event('" + index + "', '" + uuid + "')"
}

module.exports = {
  handler,
  input_event,
  output_event
}
