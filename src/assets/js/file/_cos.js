import COS from 'cos-js-sdk-v5'
import { token } from '@/api/v1/tencent-cloud'
import { fileMD5, fileOpen } from './base.js'
import path from 'path'

async function fileHandler(bucket = 'raw-1251022382', region = 'ap-nanjing') {
  return new Promise(async (resolve, reject) => {
    try {
      const cos = new COS({
        getAuthorization: async function (options, callback) {
          const response = await token(bucket, region)
          console.log(response.data)

          if (response.data) {
            const data = response.data
            const credentials = data && data.Credentials
            console.error(credentials)
            if (!data || !credentials) {
              reject('credentials invalid')
            }
            //  alert(data.StartTime)
            callback({
              TmpSecretId: credentials.TmpSecretId,
              TmpSecretKey: credentials.TmpSecretKey,
              SecurityToken: credentials.Token,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.StartTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.ExpiredTime // 时间戳，单位秒，如：1580000900
            })
          } else {
            reject('no data!')
          }
        }
      })
      resolve({ cos, bucket, region })
    } catch (err) {
      reject(err)
    }
  })
}

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, time)
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
          console.error(start + time)
          console.error(Date.now())
          progress((Date.now() - start) / (2 * time))
          await sleep(500)
        } else {
          const file = await fileDownload(md5, extension, handler)

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
async function fileDownload(md5, extension, progress, handler, dir = '') {
  // const filename = md5 + extension
  const filename = path.join(dir, md5 + extension)
  return new Promise(async (resolve, reject) => {
    try {
      // 分片上传文件
      const data = await handler.cos.getObject({
        Bucket: handler.bucket,
        Region: handler.region,
        Key: filename,
        onProgress: function (progressData) {
          progress(progressData.percent)
          console.log('下载中', JSON.stringify(progressData))
        }
      })
      console.error(data)
      //alert(data.Body)
      resolve(data.Body)
    } catch (err) {
      reject(err)
    }
  })
}
async function fileUpload(md5, extension, file, progress, handler, dir = '') {
  const filename = path.join(dir, md5 + extension)
  //alert(filename)
  return new Promise(async (resolve, reject) => {
    try {
      // 分片上传文件
      const data = await handler.cos.uploadFile({
        Bucket: handler.bucket,
        Region: handler.region,
        Key: filename,
        Body: file,
        onHashProgress: function (progressData) {
          console.log('校验中', JSON.stringify(progressData))
        },
        onProgress: function (progressData) {
          progress(progressData.percent)
          console.log('上传中', JSON.stringify(progressData))
        }
      })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}
function getUrl(info, file, handler) {
  let url = handler.cos.getObjectUrl(
    {
      Bucket: info.bucket.bucket,
      Region: info.bucket.region,
      Key: path.join(info.path, info.root, file.md5 + file.ext),
      Expires: 60,
      Sign: true
    },
    function (err, data) {
      console.log(err || (data && data.Url))
    }
  )
  return url
}
function fileUrl(md5, extension, handler) {
  const filename = md5 + extension
  let url = handler.cos.getObjectUrl(
    {
      Bucket: configure.bucket,
      Region: configure.region,
      Key: filename,
      Expires: 60,
      Sign: true
    },
    function (err, data) {
      console.log(err || (data && data.Url))
    }
  )
  return url
}
async function fileHas(md5, extension, handler, dir = '') {
  const filename = path.join(dir, md5 + extension)
  return new Promise(async (resolve, reject) => {
    try {
      const data = await handler.cos.headObject({
        Bucket: handler.bucket,
        Region: handler.region,
        Key: filename
      })
      resolve({ md5, extension })
    } catch (err) {
      resolve(null)
    }
  })
}

export default {
  fileMD5,
  fileOpen,
  fileHas,
  fileUrl,
  fileUpload,
  fileHandler,
  fileProcess,
  fileDownload,
  getUrl
}
