import server from './server.js'

import axios from 'axios'

import environment from '@/environment.js'
const infoUrl = '/store/advanced/to/[filename].info'
const url = '/store/advanced/from/[filename]'
const toUrl = '/store/advanced/to/[filename]'
const api = '/v1/uploads/file?advanced=true'

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, time)
  })
}
function fileUpload(md5, extension, file, progress, handler = null) {
  return new Promise((resolve, reject) => {
    server
      .fileUpdateImpl(md5, extension, file, progress, 0, environment.api + api)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function fileUrl(md5, extension, handler = null) {
  const filename = md5 + extension
  return environment.api + toUrl.replace('[filename]', filename)
}

function fileConvert(md5, extension, progress, handler = null) {
  return new Promise(async (resolve, reject) => {
    let p = 0
    for (var i = 0; i < 300; ++i) {
      const ret = await fileHas(md5, extension, handler)
      if (ret !== null) {
        progress(1)
        resolve(ret)
        return
      }
      p = p + (1 - p) / 5
      progress(p)
      const result = await sleep(1000)
    }
    resolve(null)
  })
}
function fileHas(md5, extension, handler = null) {
  const filename = md5 + extension
  return new Promise((resolve, reject) => {
    const url = environment.api + infoUrl.replace('[filename]', filename)
    axios
      .get(url)
      .then(function (response) {
        console.error(response)
        const data = response.data
        const lines = data.trim().split('\n')
        console.error(lines.length)
        if (lines.length > 1) {
          resolve({ md5: lines[0], extension: lines[1] })
        } else {
          resolve(null)
        }
      })
      .catch(function (error) {
        resolve(null)
      })
  })
}
export default {
  fileMD5: server.fileMD5,
  fileOpen: server.fileOpen,
  fileHas,
  fileUrl,
  fileUpload,
  fileHandler: server.fileHandler,
  fileConvert
}
