<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin: 28px 18px 0">
      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">图片名称：</b>
            <span v-if="data">{{ data.name }}</span>
          </div>
          <div class="box-item" style="text-align: center">
            <el-image
              id="image"
              v-loading="expire"
              element-loading-text="正在预处理"
              element-loading-background="rgba(255,255, 255, 0.3)"
              style="height: 300px; width: 100%"
              :src="file"
              :fit="'contain'"
              @load="dealWith()"
            />
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
import { getPictureOne, putPicture, deletePicture } from '@/api/resources'
import { postFile } from '@/api/files'
import { printVector2 } from '@/assets/js/helper'

import { mapState } from 'vuex'
export default {
  name: 'PictureView',
  data: function () {
    return {
      data: null,
      file: null,
      expire: false
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
            item: '图片名称',
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
            item: '图片尺寸',
            text: printVector2(JSON.parse(this.data.info).size)
          },
          {
            item: '文件大小',
            text: this.data.file.size + '字节'
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
    getPictureOne(self.id).then(response => {
      self.data = response.data
      self.file = response.data.file.url
    })
  },
  methods: {
    getImageSize: function (imageEl) {
      return new Promise((resolve, reject) => {
        let img = new Image() // 新建一个图片对象
        img.src = imageEl.src
        if (img.width === 0) {
          img.onload = function () {
            resolve({ x: img.width, y: img.height })
          }
        } else {
          resolve({ x: img.width, y: img.height })
        }
      })
    },
    thumbnail: function (image, width, height) {
      return new Promise((resolve, reject) => {
        const image_type = 'image/jpeg'
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        canvas.toBlob(function (blob) {
          resolve(blob)
        }, image_type)
      })
    },
    save(md5, extension, info, file, handler) {
      const self = this
      const data = {
        size: file.size,
        type: file.type,
        md5,
        key: md5 + extension,
        filename: file.name,
        url: self.store.fileUrl(md5, extension, handler)
      }

      postFile(data)
        .then(response => {
          const picture = { image_id: response.data.id, info }
          putPicture(self.data.id, picture)
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

    async setup(size, image) {
      const self = this
      const store = this.store

      const info = JSON.stringify({ size })
      if (size.x <= 1024) {
        const picture = { image_id: self.data.file.id, info }
        putPicture(self.data.id, picture).then(response => {
          self.data.image_id = response.data.image_id
          self.data.info = response.data.info
          self.expire = false
        })
        return
      }
      const blob = await self.thumbnail(image, 512, size.y * (512 / size.x))

      blob.name = self.data.name + '.thumbnail'
      blob.extension = '.jpg'
      const file = blob

      const md5 = await store.fileMD5(file)
      const handler = await store.fileHandler()
      const ret = await store.fileHas(md5, file.extension, handler)
      if (ret !== null) {
        self.save(ret.md5, ret.extension, info, file, handler)
      } else {
        const r = await store.fileUpload(
          md5,
          file.extension,
          file,
          p => {},
          handler
        )
        self.save(md5, file.extension, info, file, handler)
      }
    },
    dealWith: async function () {
      const self = this
      if (!self.prepare) {
        const image = document.getElementById('image')
        image.crossOrigin = 'anonymous'
        if (image.complete) {
          const size = await self.getImageSize(image)
          console.log(size)

          self.setup(size, image)
        }
      } else {
        self.expire = false
      }
    },
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
      console.log(self.api + '/resources/' + id + '?type=picture')

      deletePicture(id)
        .then(response => {
          self.$router.push({ path: '/picture/index' })
        })
        .catch(function (error) {
          console.log(error)
          self.failed(JSON.parse(error.message))
        })
    },
    namedWindow: function () {
      const self = this
      this.$prompt('请输入新名称', '修改图片名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: self.data.name
      })
        .then(({ value }) => {
          self.named(self.data.id, value)
          this.$message({
            type: 'success',
            message: '新的图片名称: ' + value
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
      const picture = { name }
      console.log(picture)
      putPicture(id, picture)
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
