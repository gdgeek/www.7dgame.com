import COS from 'cos-js-sdk-v5'
import { sts } from '@/api/servers'
import { fileMD5, fileOpen } from './base.js'
const configure = { bucket: 'mrpp-1257979353', region: 'ap-chengdu' }

function fileHandler() {
  return new Promise((resolve, reject) => {
    let handler = new COS({
      // 必选参数
      getAuthorization: function (options, callback) {
        sts()
          .then(response => {
            console.log(response)
            if (response.data) {
              const data = response.data
              const credentials = data && data.credentials
              if (!data || !credentials) {
                reject('credentials invalid')
              }
              callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
              })
            } else {
              reject('no data!')
            }
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      }
    })
    resolve(handler)
  })
}

function fileUpload(md5, extension, file, progress, handler) {
  const filename = md5 + extension
  return new Promise((resolve, reject) => {
    // 分片上传文件
    handler.uploadFile(
      {
        Bucket: configure.bucket,
        Region: configure.region,
        Key: filename,
        Body: file,
        onHashProgress: function (progressData) {
          console.log('校验中', JSON.stringify(progressData))
        },
        onProgress: function (progressData) {
          progress(progressData.percent)
          console.log('上传中', JSON.stringify(progressData))
        }
      },
      function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
        console.log(err, data)
      }
    )
  })
}

function fileUrl(md5, extension, handler) {
  const filename = md5 + extension
  let url = handler.getObjectUrl(
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
function fileHas(md5, extension, handler) {
  const filename = md5 + extension
  return new Promise((resolve, reject) => {
    handler.headObject(
      {
        Bucket: configure.bucket,
        Region: configure.region,
        Key: filename
      },
      function (err, data) {
        console.log(err)
        if (err) {
          resolve(null)
        } else {
          resolve({ md5, extension })
        }
      }
    )
  })
}

export default {
  fileMD5,
  fileOpen,
  fileHas,
  fileUrl,
  fileUpload,
  fileHandler
}
