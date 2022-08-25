import { fileMD5, fileOpen } from './base.js'

import environment from '@/environment.js'
import axios from 'axios'

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
function fileHandler() {
  return new Promise((resolve, reject) => {
    resolve(null)
  })
}

function fileUpdateImpl(
  md5,
  extension,
  file,
  progress,
  skip,
  url = environment.api + configure.api
) {
  const filename = md5 + extension
  return new Promise((resolve, reject) => {
    const formData = new FormData() //初始化一个FormData对象
    const blockSize = 1048576 //每块的大小
    const nextSize = Math.min((skip + 1) * blockSize, file.size) //读取到结束位置
    const fileData = file.slice(skip * blockSize, nextSize) //截取 部分文件 块

    formData.append('file', fileData) //将 部分文件 塞入FormData
    formData.append('filename', filename) //保存文件名字
    formData.append('md5', md5) //将 部分文件 塞入FormData
    formData.append('skip', skip)
    formData.append('block_size', blockSize)
    formData.append('upload_size', nextSize)
    formData.append('size', file.size)
    console.log(url)
    axios
      .post(url, formData)
      .then(response => {
        console.error(response.data)
        if (file.size <= nextSize) {
          //如果上传完成，则跳出继续上传
          progress(1)
          resolve(response)
        } else {
          progress(nextSize / file.size)
          fileUpdateImpl(md5, extension, file, progress, ++skip, url)
            .then(response => {
              resolve(response)
            })
            .catch(err => {
              reject(err)
            })
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

function fileUpload(md5, extension, file, progress, handler = null) {
  return new Promise((resolve, reject) => {
    fileUpdateImpl(md5, extension, file, progress, 0)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  fileMD5,
  fileOpen,
  fileHas,
  fileUrl,
  fileUpload,
  fileHandler,
  fileUpdateImpl
}
