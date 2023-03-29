function canRegister() {
  return 'mrpp.com' === process.env.VUE_APP_BASE_MODE
}

function useCloud() {
  return 'local' !== process.env.VUE_APP_BASE_MODE
}
function canDocument() {
  return 'local' !== process.env.VUE_APP_BASE_MODE
}
function canWeb() {
  return 'mrpp.com' === process.env.VUE_APP_BASE_MODE
}
function canSetup() {
  return 'local' === process.env.VUE_APP_BASE_MODE
}
function mrpp() {
  return 'mrpp.com' === process.env.VUE_APP_BASE_MODE
}

function mrcn() {
  return (
    '4mr.cn' === process.env.VUE_APP_BASE_MODE ||
    '7dgame.com' === process.env.VUE_APP_BASE_MODE
  )
}

function local() {
  return 'local' === process.env.VUE_APP_BASE_MODE
}
function canManager() {
  return (
    'local' === process.env.VUE_APP_BASE_MODE ||
    '4mr.cn' === process.env.VUE_APP_BASE_MODE ||
    '7dgame.com' === process.env.VUE_APP_BASE_MODE
  )
}
function getIP() {
  const reg = /^([^:]+)/g
  const ret = reg.exec(window.location.host)
  if (ret !== null) {
    return ret[1]
  }
  return null
}
function subtitle() {
  switch (process.env.VUE_APP_BASE_MODE) {
    case '4mr.cn':
      return '内部版本'
    case '7dgame.com':
      return '元气弹版本'
    case 'local':
      return '私有部署版本'
    case 'local':
      return '开发版本'
  }
  return '公测版本'
}
function replaceIP(input) {
  return input.replace('[ip]', getIP())
}
module.exports = {
  local: process.env.VUE_APP_LOCAL ? true : false,
  mode: process.env.VUE_APP_BASE_MODE,
  ip: getIP(),
  api: process.env.VUE_APP_BASE_API,
  doc: process.env.VUE_APP_DOC_API,
  version: 3,
  canRegister,
  canWeb,
  canSetup,
  subtitle,
  canManager,
  useCloud,
  canDocument,
  mrcn,
  mrpp,
  local,
  replaceIP
}
