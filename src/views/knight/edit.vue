<template>
  <div class="verse-view">
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
        <JsonEditorVue
          v-model="value"
          v-bind="{
            /* 局部 props & attrs */
          }"
        />
        <el-card v-if="item !== null" class="box-card">
          <el-button style="width: 100%" type="primary" size="mini">
            保存
          </el-button>
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
import { getKnight } from '@/api/v1/knight'
import JsonEditorVue from 'json-editor-vue'
export default {
  data() {
    return {
      item: null
    }
  },
  components: {
    JsonEditorVue
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  async mounted() {
    const response = await getKnight(this.id, { expand: 'image,author' })

    this.item = response.data
    console.log(this.item)
    // alert(this.item)
  },
  methods: {}
}
</script>
