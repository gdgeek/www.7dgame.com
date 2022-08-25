module.exports = {
  local: process.env.VUE_APP_LOCAL ? true : false,
  ip: document.domain,
  api: process.env.VUE_APP_BASE_API.replace('[ip]', document.domain),
  url: process.env.VUE_APP_BASE_URL.replace('[ip]', document.domain),
  doc: process.env.VUE_APP_DOC_API
}
