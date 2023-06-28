<template>
  <div class="verse-view">
    <event-dialog
      :node="events"
      :uuid="id"
      @postEvent="postEvent"
      ref="dialog"
    ></event-dialog>

    <el-row :gutter="20" style="margin: 28px 18px 0">
      <el-col :sm="16">
        <el-card v-if="item" class="box-card">
          <div slot="header">
            <i class="el-icon-edit"></i>

            <b id="title">【骑士】名称：</b>
            <span>{{ item.title }}</span>
          </div>

          <div class="box-item">
            <el-image
              v-if="!item.image"
              fit="contain"
              style="width: 100%; height: 300px"
            />
            <el-image
              v-else
              fit="contain"
              style="width: 100%; height: 300px"
              :src="item.image.url"
            />
          </div>
        </el-card>
        <br />
        <el-form ref="item" v-if="item" :model="item" label-width="80px">
          <el-form-item label="骑士名称">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="item.image_id"></el-input>
          </el-form-item>
          <el-form-item label="模型">
            <el-input v-model="item.mesh_id"></el-input>
          </el-form-item>

          <el-form-item label="数据">
            <el-input type="textarea" v-model="item.data"></el-input>
          </el-form-item>
          <el-form-item label="信息">
            <el-input type="textarea" v-model="item.info"></el-input>
          </el-form-item>
        </el-form>

        <el-card v-if="item !== null" class="box-card">
          <el-button-group>
            <el-button
              @click="onSubmit"
              icon="el-icon-circle-check"
              type="primary"
            >
              信息保存
            </el-button>
            <el-button @click="openDialog" type="primary" icon="el-icon-edit">
              事件编辑
            </el-button>
          </el-button-group>
          <br />
        </el-card>
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">
            <b>【骑士】信息</b>
          </div>
          <div class="box-item">{{ item }}</div>

          <br />
        </el-card>

        <br />

        <br />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventDialog from '@/components/Rete/EventDialog.vue'
import { getKnight, putKnight } from '@/api/v1/knight'
export default {
  data() {
    return {
      item: null
    }
  },
  components: {
    EventDialog
  },
  computed: {
    info: {
      get: function () {
        if (this.item) return JSON.parse(this.item.info)
        return null
      },
      set: function (data) {
        this.item.info = JSON.stringify(data)
      }
    },
    events() {
      if (this.info) {
        return this.info.events
      }
      return null
    },
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async postEvent({ uuid, node, inputs, outputs }) {
      if (this.item) {
        let info = this.info
        info.events = { inputs, outputs }
        this.info = info
      }

      this.$refs.dialog.close()
    },
    async openDialog() {
      this.$refs.dialog.open()
    },
    async refresh() {
      const response = await getKnight(this.id, {
        expand: 'image,author'
      })
      this.item = response.data
    },
    onSubmit() {
      const self = this
      putKnight(self.id, self.item).then(response => {
        self.$message({
          message: '保存成功',
          type: 'success'
        })
        this.refresh()
      })
    }
  }
}
</script>
