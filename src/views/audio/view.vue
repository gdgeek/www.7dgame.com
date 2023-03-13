<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin: 28px 18px 0">
      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">音频名称：</b>
            <span v-if="data">{{ data.name }}</span>
          </div>
          <img id="imgs" :src="imgSrc" style="display: none" />
          <div class="box-item" style="text-align: center">
            <section class="audio-bgc">
              <br />
              <div class="audio-box">
                <div
                  class="audio-record"
                  :class="[isPlay == true ? 'audio-record-playfast' : '']"
                  @click="handlePlayAudio()"
                />
                <div
                  class="audio-record-image"
                  :class="[isPlay == true ? 'audio-record-play' : '']"
                  @click="handlePlayAudio()"
                />
                <!-- <img class="audio-bgc-img" @click="handlePlayAudio()" /> -->
              </div>
              <audio
                id="audio"
                controls="controls"
                style="width: 95%; height: 84px"
                :src="file"
                preload="auto"
                @play="listenPlay()"
                @pause="listenPause()"
                @ended="listenEnd()"
                @canplaythrough="dealWith()"
              />
            </section>
          </div>
        </el-card>
        <br />
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">
            <b>音频信息</b>
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
import { getAudio, putAudio, deleteAudio } from '@/api/resources'

import { postFile } from '@/api/v1/files'
// import { printVector2 } from '@/assets/js/helper'
import { mapState } from 'vuex'

export default {
  name: 'AudioView',
  data() {
    return {
      data: null,
      file: null,
      expire: true,
      isPlay: false,
      imgSrc: '/media/bg/audio-cover.jpg'
    }
  },
  computed: {
    ...mapState({
      store: state => state.config.store
    }),
    tableData() {
      if (this.data !== null) {
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
          }
          // {
          //   item: '音频尺寸',
          //   text: printVector2(JSON.parse(this.data.info).size)
          // }
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
  created: async function () {
    const self = this
    self.expire = true

    const response = await getAudio(self.id)
    self.data = response.data
    self.file = response.data.file.url
  },
  methods: {
    handlePlayAudio() {
      const audio = document.getElementById('audio')
      // console.log(this.$refs.audio1.durationchange, 'this.$refs.audio1')

      if (this.isPlay === false) {
        audio.play()
        this.isPlay = true
      } else {
        audio.pause()
        this.isPlay = true
      }
      // this.isPlay = !this.isPlay
    },
    listenPlay() {
      this.isPlay = true
      console.log('开始播放', this.isPlay)
    },
    listenPause() {
      this.isPlay = false
      console.log('暂停播放', this.isPlay)
    },
    listenEnd() {
      this.isPlay = false
      console.log('结束播放', this.isPlay)
    },
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
    dealWith: function () {
      const self = this
      if (!self.prepare) {
        const audio = document.getElementById('audio')
        // 获取新的音频
        // const new_audio = document.getElementById('new_audio')
        const size = { x: 800, y: 800 }
        self.setup(audio, size)
      } else {
        self.expire = false
      }
    },
    thumbnail: function (video, width, height) {
      return new Promise((resolve, reject) => {
        const image_type = 'image/jpeg'
        const canvas = document.createElement('canvas')
        const bgImg = document.getElementById('imgs')
        canvas.width = width
        canvas.height = height
        // 将图片绘制到canvas上，并转化成图片
        const ctx1 = canvas.getContext('2d')
        ctx1.drawImage(bgImg, 0, 0, width, height)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, image_type)
      })
    },
    async setup(audio, size) {
      const self = this
      const store = self.store
      // console.log(store, 'store23213')
      if (size.x !== 0) {
        const info = JSON.stringify({ size })
        const blob = await self.thumbnail(audio, size.x * 0.5, size.y * 0.5)
        blob.name = self.data.name + '.thumbnail'
        blob.extension = '.jpg'
        const file = blob
        const md5 = await store.fileMD5(file)
        const handler = await store.storeHandler()
        const has = await store.fileHas(
          md5,
          file.extension,
          handler,
          'screenshot/audio'
        )
        if (has) {
          self.save(md5, file.extension, info, file, handler)
        } else {
          const r = await store.fileUpload(
            md5,
            file.extension,
            file,
            p => {},
            handler,
            'screenshot/audio'
          )
          self.save(md5, file.extension, info, file, handler)
        }
      }
    },
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
// @import '~@/styles/view-style.scss';
.audio-bgc {
  position: relative;
  width: 100%;
  height: 350px;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgb(169, 196, 228) 100%
  );
}
.audio-box {
  position: relative;
  margin: auto;
  margin-top: 26px;
  width: 200px;
  height: 200px;
}
.audio-record {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: url('/media/bg/audio-record.jpg') center no-repeat;
  background-size: cover;
}
.audio-record-image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  background: url('/media/bg/audio-img.jpg') center no-repeat;
  background-size: 113%;
}
.audio-record-play {
  animation: spin 6s infinite linear;
}
.audio-record-playfast {
  animation: recordfast 0.16s infinite linear;
}
@keyframes spin {
  0% {
    transform: rotate(0edg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes recordfast {
  0% {
    transform: rotate(0edg);
  }
  100% {
    transform: rotate(1.1deg);
  }
}
</style>
