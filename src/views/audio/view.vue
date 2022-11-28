<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin: 28px 18px 0">
      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">音频名称：</b>
            <span v-if="data">{{ data.name }}</span>
          </div>
          <div class="box-item" style="text-align: center">
            <audio
              id="audio"
              controls="controls"
              style="height: 300px; width: 100%"
            >
              <source
                v-if="file !== null"
                id="src"
                :src="file"
                type="audio/wav"
              />
            </audio>
            <!-- <audio
              id="new_audio "
              style="height: 100%; width: 100%"
              hidden
              @canplaythrough="dealWith()"
            /> -->
          </div>
        </el-card>
        <br />
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">
            <b>图片信息</b>
            :
          </div>
          <div class="box-item">
            <el-table :data="tableData" stripe>
              <el-table-column prop="item" label="条目" />
              <el-table-column prop="text" label="内容" />
            </el-table>

            <aside style="margin-top: 10px; margin-bottom: 30px">
              <el-button-group style="float: right">
                <el-button type="primary" size="mini" @click="namedWindow()">
                  <i class="el-icon-edit" />
                  改名
                </el-button>
                <el-button type="primary" size="mini" @click="deleteWindow()">
                  <i class="el-icon-delete" />
                  删除
                </el-button>
              </el-button-group>
            </aside>
          </div>
        </el-card>
        <br />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getAudioOne, putAudio, deleteAudio } from '@/api/resources'
import { postFile } from '@/api/files'
import { printVector2 } from '@/assets/js/helper'
import { mapState } from 'vuex'

export default {
  name: 'AudioView',
  data: function () {
    return {
      data: null,
      file: null,
      expire: true
    }
  },
  computed: {
    ...mapState({
      store: state => state.config.store
    }),
    tableData() {
      if (this.data !== null && this.prepare) {
        return [
          {
            item: '音频名称',
            text: this.data.name
          },
          {
            item: '创建者',
            text: this.data.author.nickname
          },
          {
            item: '创建时间',
            text: this.data.created_at
          },
          {
            item: '文件大小',
            text: this.data.file.size + '字节'
          },
          {
            item: '音频尺寸',
            text: printVector2(JSON.parse(this.data.info).size)
          }
        ]
      } else {
        return []
      }
    },
    id() {
      return this.$route.query.id
    },
    prepare() {
      return this.data != null && this.data.info !== null
    }
  },
  created: function () {
    const self = this
    self.expire = true
    getAudioOne(self.id).then(response => {
      //
      self.data = response.data
      console.log(response.data)
      self.file = response.data.file.url
      // setTimeout(() => {
      //   self.init()
      // }, 0)
    })
  },
  methods: {
    // thumbnail: function (audio, width, height) {
    //   return new Promise((resolve, reject) => {
    //     const image_type = 'image/jpeg'
    //     const canvas = document.createElement('canvas')
    //     canvas.width = width
    //     canvas.height = height
    //     // 将所截图片绘制到canvas上，并转化成图片
    //     canvas
    //       .getContext('2d')
    //       .drawImage(audio, 0, 0, canvas.width, canvas.height)

    //     canvas.toBlob(function (blob) {
    //       resolve(blob)
    //     }, image_type)
    //   })
    // },
    save(md5, extension, info, file, handler) {
      const self = this
      const data = {
        md5,
        key: md5 + extension,
        filename: file.name,
        url: self.store.fileUrl(md5, extension, handler, 'screenshot/audio')
      }
      postFile(data)
        .then(response => {
          const audio = { image_id: response.data.id, info }
          putAudio(self.data.id, audio)
            .then(response => {
              self.data.image_id = response.data.image_id
              self.data.info = response.data.info
              self.expire = false
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },

    // async setup(audio, size) {
    //   const self = this
    //   const store = self.store
    //   console.log(store, 'store23213')
    //   if (size.x !== 0) {
    //     const info = JSON.stringify({ size })
    //     const blob = await self.thumbnail(audio, size.x * 0.5, size.y * 0.5)
    //     blob.name = self.data.name + '.thumbnail'
    //     blob.extension = '.jpg'
    //     const file = blob
    //     const md5 = await store.fileMD5(file)
    //     const handler = await store.fileHandler(
    //       'store-1251022382',
    //       'ap-nanjing'
    //     )
    //     const ret = await store.fileHas(
    //       md5,
    //       file.extension,
    //       handler,
    //       'screenshot/audio'
    //     )
    //     if (ret !== null) {
    //       self.save(ret.md5, ret.extension, info, file, handler)
    //     } else {
    //       const r = await store.fileUpload(
    //         md5,
    //         file.extension,
    //         file,
    //         p => {},
    //         handler,
    //         'screenshot/audio'
    //       )
    //       self.save(md5, file.extension, info, file, handler)
    //     }
    //   }
    // },
    // init: function () {
    //   const audio = document.getElementById('audio')
    //   const source = document.getElementById('src')

    //   // 获取新的音频
    //   const new_audio = document.getElementById('new_audio')
    //   new_audio.src = source.src + '?t=' + new Date()
    //   new_audio.crossOrigin = 'anonymous'
    //   new_audio.currentTime = 0.000001
    //   audio.addEventListener(
    //     'timeupdate',
    //     function () {
    //       new_audio.currentTime = audio.currentTime
    //     },
    //     false
    //   )
    // },
    // dealWith: function () {
    //   const self = this
    //   if (!self.prepare) {
    //     const audio = document.getElementById('audio')
    //     // 获取新的音频
    //     const new_audio = document.getElementById('new_audio')
    //     const size = { x: audio.audioWidth, y: audio.audioHeight }
    //     self.setup(new_audio, size)
    //   } else {
    //     self.expire = false
    //   }
    // },
    deleteWindow: function () {
      const self = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          self.delete(self.data.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delete: function (id) {
      const self = this
      console.log(self.api + '/resources/' + id + '?type=audio')

      deleteAudio(id)
        .then(response => {
          self.$router.push({ path: '/audio/index' })
        })
        .catch(function (error) {
          console.log(error)
          self.failed(JSON.parse(error.message))
        })
    },
    namedWindow: function () {
      const self = this
      this.$prompt('请输入新名称', '修改音频名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: self.data.name
      })
        .then(({ value }) => {
          self.named(self.data.id, value)
          this.$message({
            type: 'success',
            message: '新的音频名称: ' + value
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    named: function (id, name) {
      const self = this
      const audio = { name }
      console.log(audio)
      putAudio(id, audio)
        .then(response => {
          self.data.name = response.data.name
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
