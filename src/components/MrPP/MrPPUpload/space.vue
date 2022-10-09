<template>
  <div>
    <el-card class="box-card-component" style="margin: 18px 18px 0">
      <div slot="header" class="box-card-header">
        <h3>{{ title }}:</h3>
        {{ declared }}
      </div>
      <div style="position: relative">
        <div v-for="item in data" :key="item.name">
          <div class="progress-item">
            <span>{{ item.title }}</span>
            <el-progress :percentage="item.percentage" />
          </div>
        </div>

        <el-divider />
        <el-button type="primary" :disabled="isdisabled" @click="select()">
          <slot>11</slot>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import path from 'path'
import { mapState } from 'vuex'

import { postFile } from '@/api/files'
import { postSpace } from '@/api/v1/space'

import cloud from '@/assets/js/file/tencent-cloud.js'

export default {
  name: 'MrPPUpload',
  props: {
    fileType: {
      type: String,
      default: '*'
    },
    advanced: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    const data = [
      {
        name: 'md5',
        title: '预先处理',
        failed: 'md5计算失败',
        declared: '通过计算得到文件的 md5 编码',
        percentage: 0,
        process: function ({ file }) {},
        status: ''
      },
      {
        name: 'upload',
        title: '上传文件',
        failed: '文件上传失败',
        declared: '文件正在发送至服务器',
        percentage: 0,
        status: ''
      },
      {
        name: 'convert',
        title: '后台处理',
        failed: '后台处理超时',
        declared: '服务器后台对文件进行处理',
        percentage: 0,
        status: ''
      },
      {
        name: 'save',
        title: '保存信息',
        failed: '数据库储存失败',
        declared: '文件数据存储在数据库中',
        percentage: 0,
        status: ''
      }
    ]

    return {
      data,
      title: '选择文件',
      declared: '请选择对应格式的文件进行上传操作',
      isdisabled: false
    }
  },
  methods: {
    step(idx) {
      const item = this.data[idx]
      this.title = item.title
      this.declared = item.declared
    },
    progress(p, idx) {
      this.step(idx)
      if (p >= 1) {
        this.data[idx].status = 'success'
      } else {
        this.data[idx].status = ''
      }

      this.data[idx].percentage = Math.round(Math.min(p, 1) * 100)
    },
    async postFile(info, data, name, handler) {
      return new Promise(async function (resolve, reject) {
        try {
          const file = await postFile({
            md5: data.md5,
            key: data.md5 + data.ext,
            filename: name,
            url: cloud.getUrl(info, data, handler)
          })
          resolve(file.data)
        } catch (err) {
          reject(err)
        }
      })
    },
    async save(info, progress, handler) {
      const self = this
      console.error(info)
      return new Promise(async function (resolve, reject) {
        try {
          const authoring_glb_data = await self.postFile(
            info,
            info.authoring_glb,
            info.name + '_authoring.glb',
            handler
          )
          progress(0.25)

          const occlusion_glb_data = await self.postFile(
            info,
            info.occlusion_glb,
            info.name + '_occlusion.glb',
            handler
          )

          progress(0.5)

          //const navmesh_data = await postFile(info, info.navmesh, handler)
          const dat_data = await self.postFile(
            info,
            info.dat,
            info.name + '_dat.dat',
            handler
          )
          progress(0.75)

          const data = {
            title: info.name,
            sample_id: occlusion_glb_data.id,
            mesh_id: authoring_glb_data.id,
            dat_id: dat_data.id,
            info: JSON.stringify(info)
          }
          const space = await postSpace(data)

          progress(1)
          resolve(space)
        } catch (err) {
          reject(err)
        }
      })
    },
    async upload(md5, file, handler) {
      const self = this
      return new Promise(async function (resolve, reject) {
        try {
          const store = cloud
          let has = await store.fileHas(md5, file.extension, handler, 'upload')
          if (has === null) {
            const r = await store.fileUpload(
              md5,
              file.extension,
              file,
              function (p) {
                self.progress(p, 1)
              },
              handler,
              'upload'
            )
          }
          self.progress(1, 1)

          const json = await store.fileProcess(
            'info',
            '.json',
            function (p) {
              self.progress(p, 2)
            },
            handler,
            path.join('release', md5),
            10000
          )

          if (json === null) {
            throw 'No Info File'
          }
          const info = JSON.parse(json)
          resolve(info)
        } catch (err) {
          reject(err)
        }
      })
    },
    async select() {
      const self = this
      return new Promise(async function (resolve, reject) {
        try {
          const store = cloud
          const file = await store.fileOpen(self.fileType)

          self.isdisabled = false
          const md5 = await store.fileMD5(file, function (p) {
            self.progress(p, 0)
          })
          const handler = await store.fileHandler()
          let info = null
          let hasJson = await store.fileHas(
            'info',
            '.json',
            handler,
            path.join('release', md5)
          )
          if (hasJson !== null) {
            let json = await store.fileDownload(
              'info',
              '.json',
              function (p) {
                self.progress(p, 1)
              },
              handler,
              path.join('release', md5)
            )
            if (json === null) {
              throw 'No Info File'
            } else {
              info = JSON.parse(json)
              self.progress(1, 1)
              self.progress(1, 2)
            }
          }
          if (info === null) {
            info = await self.upload(md5, file, handler)
          }

          if (info.status !== 'success') {
            throw 'Info File Not Success'
          }
          const response = await self.save(
            info,
            function (p) {
              self.progress(p, 3)
            },
            handler
          )
          if (response.data === null) {
            throw 'No Space!'
          }
          self.progress(1, 3)
          self.$router.push({
            path: '/space/view',
            query: { id: response.data.id }
          })
          resolve()
        } catch (err) {
          alert(err)
          reject(err)
        }
      })
    }
  }
}
</script>

<style scoped></style>
