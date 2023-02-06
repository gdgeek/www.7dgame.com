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
  return '4mr.cn' === process.env.VUE_APP_BASE_MODE
}

function local() {
  return 'local' === process.env.VUE_APP_BASE_MODE
}
function canManager() {
  return (
    'local' === process.env.VUE_APP_BASE_MODE ||
    '4mr.cn' === process.env.VUE_APP_BASE_MODE
  )
}
function subtitle() {
  switch (process.env.VUE_APP_BASE_MODE) {
    case '4mr.cn':
      return '内部版本'
    case 'local':
      return '私有部署版本'
    case 'local':
      return '开发版本'
  }
  return '公测版本'
}
module.exports = {
  local: process.env.VUE_APP_LOCAL ? true : false,
  mode: process.env.VUE_APP_BASE_MODE,
  ip: document.domain,
  api: process.env.VUE_APP_BASE_API.replace('[ip]', document.domain),
  url: process.env.VUE_APP_BASE_URL.replace('[ip]', document.domain),
  doc: process.env.VUE_APP_DOC_API,
  version: 2,
  canRegister,
  canWeb,
  canSetup,
  subtitle,
  canManager,
  useCloud,
  canDocument,
  mrcn,
  mrpp,
  local
}
