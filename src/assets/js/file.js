import COS from "cos-js-sdk-v5";
import Vue from "vue";
import store from "../../vuex/store";
const config = { bucket: "mrpp-1257979353", region: "ap-chengdu" };
function fileCos() {
  return new Promise((resolve, reject) => {
    let cos = new COS({
      // 必选参数
      getAuthorization: function (options, callback) {
        Vue.axios
          .get(store.state.api.url + "/servers/sts")
          .then((response) => {
            console.log(response);
            if (response.data) {
              const data = response.data;
              const credentials = data && data.credentials;
              if (!data || !credentials) {
                reject("credentials invalid");
              }
              callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
              });
            } else {
              reject("no data!");
            }
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      },
    });
    resolve(cos);
  });
}
function fileUpload(filename, file, progress, cos) {
  console.log(file);
  return new Promise((resolve, reject) => {
    // 分片上传文件
    cos.uploadFile(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: filename,
        Body: file,
        onHashProgress: function (progressData) {
          console.log("校验中", JSON.stringify(progressData));
        },
        onProgress: function (progressData) {
          progress(progressData.percent);
          console.log("上传中", JSON.stringify(progressData));
        },
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
        console.log(err, data);
      }
    );
  });
}
function fileUrl(filename, cos) {
  let url = cos.getObjectUrl(
    {
      Bucket: config.bucket,
      Region: config.region,
      Key: filename,
      Expires: 60,
      Sign: true,
    },
    function (err, data) {
      console.log(err || (data && data.Url));
    }
  );
  return url;
}
function fileHas(filename, cos) {
  return new Promise((resolve, reject) => {
    cos.headObject(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: filename,
      },
      function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
          console.log("!");
          resolve(false);
        } else {
          console.log("2");
          resolve(true);
        }
      }
    );
  });
}
function fileMD5(file, progress, spark) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const blobSlice =
      File.prototype.mozSlice ||
      File.prototype.webkitSlice ||
      File.prototype.slice;
    const chunkSize = 2097152;
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    reader.onload = function (e) {
      spark.appendBinary(e.target.result);
      currentChunk++;
      progress((currentChunk + 1) / chunks);
      if (currentChunk < chunks) {
        doLoad();
      } else {
        resolve(spark.end());
      }
    };
    function doLoad() {
      let start = currentChunk * chunkSize;
      let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      reader.readAsBinaryString(blobSlice.call(file, start, end));
    }
    doLoad();
  });
}
function fileOpen(accept) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = function (e) {
      const file = this.files[0];
      console.log(file);
      const patternFileExtension = /\.([0-9a-z]+)(?:[\\?#]|$)/i;
      const extension = file.name.match(patternFileExtension);
      file.extension = extension[0];
      resolve(file);
    };
    input.click();
  });
}

export { fileOpen, fileMD5, fileHas, fileUrl, fileUpload, fileCos };
