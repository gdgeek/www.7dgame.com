import { fileMD5, fileOpen } from './base.js'

import environment from '@/environment.js'
import axios from 'axios'
import { getToken } from '@/utils/auth.js'
import { uploadFile } from '@/api/v1/upload'
import request from '@/utils/request'
import { effectScope } from 'vue-demi'
var qs = require('querystringify')
var path = require('path')
const configure = { path: '/store/files/', api: '/v1/uploads/file' }

function fileUrl(md5, extension, handler = null) {
  const filename = md5 + extension
  return environment.api + configure.path + filename
}

function fileHas(md5, extension, handler = null) {
  const filename = md5 + extension
  return new Promise((resolve, reject) => {
    axios
      .head(fileUrl(filename, handler))
      .then(function (response) {
        resolve(filename)
      })
      .catch(function (error) {
        if (
          typeof error.response !== 'undefined' &&
          error.response.status === 404
        ) {
          resolve(null)
        } else {
          resolve({ md5, extension })
        }
      })
  })
}
async function storeHandler() {
  return await fileHandler('store')
}
async function rawHandler() {
  return await fileHandler('raw')
}
function fileHandler(path) {
  return new Promise((resolve, reject) => {
    resolve({ path })
  })
}

function fileUpdateImpl(md5, extension, file, progress, handler, dir, skip) {
  const filename = md5 + extension

  return new Promise(async (resolve, reject) => {
    const data = new FormData() //初始化一个FormData对象
    const blockSize = 1048576 //每块的大小
    const nextSize = Math.min((skip + 1) * blockSize, file.size) //读取到结束位置
    const fileData = file.slice(skip * blockSize, nextSize) //截取 部分文件 块

    data.append('file', fileData) //将 部分文件 塞入FormData
    data.append('filename', filename) //保存文件名字
    data.append('md5', md5) //将 部分文件 塞入FormData
    data.append('skip', skip)
    data.append('block_size', blockSize)
    data.append('upload_size', nextSize)
    data.append('size', file.size)
    alert(handler.path)
    alert(dir)
    try {
      const response = await uploadFile(data)
      if (file.size <= nextSize) {
        progress(1)
        resolve(response)
      } else {
        progress(nextSize / file.size)
        const response = await fileUpdateImpl(
          md5,
          extension,
          file,
          progress,
          handler,
          dir,
          ++skip
        )

        resolve(response)
      }
    } catch (e) {
      reject(e)
    }
  })
}

function fileUpload(md5, extension, file, progress, handler, dir = '') {
  return new Promise((resolve, reject) => {
    fileUpdateImpl(md5, extension, file, progress, handler, dir, 0)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function getUrl(info, file, handler) {
  const url = ''
  return url
}

async function fileDownload(md5, extension, progress, handler, dir = '') {
  // const filename = md5 + extension
  console.error(handler)
  const filename = path.join(dir, md5 + extension)
  return new Promise(async (resolve, reject) => {
    try {
      resolve(filename)
    } catch (err) {
      reject(err)
    }
  })
}

async function fileProcess(
  md5,
  extension,
  progress,
  handler,
  dir = '',
  time = 1000
) {
  return new Promise(async (resolve, reject) => {
    try {
      const start = Date.now()
      do {
        console.log(handler)
        const has = await fileHas(md5, extension, handler, dir)

        if (has === null) {
          progress((Date.now() - start) / (2 * time))
          await sleep(500)
        } else {
          const file = await fileDownload(
            md5,
            extension,
            function (p) {
              progress((1 + p) / 2)
            },
            handler,
            dir
          )
          progress(1)
          console.error(file)
          resolve(file)
          break
        }
      } while (Date.now() < start + time)
      throw 'overtime!'
    } catch (err) {
      reject(err)
    }
  })
}

export default {
  fileMD5,
  fileOpen,
  fileHas,
  fileUrl,
  fileUpload,
  fileProcess,
  fileDownload,
  storeHandler,
  rawHandler,
  getUrl
}
