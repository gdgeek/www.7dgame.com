<template>
  <div>
    <el-form :hidden="hidden" :inline="true" size="mini">
      <el-form-item class="el-form-item" :inline="true" :label="data.title">
        <el-popover
          placement="top-start"
          :title="title"
          width="200"
          trigger="hover"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="image"
            fit="contain"
          ></el-image>
          <el-tag slot="reference">{{ title }}</el-tag>
        </el-popover>

        <el-button size="small" @click="click()" v-if="item && item.schema">
          数据输入
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMeta } from '@/api/v1/meta'
export default {
  props: ['data', 'emitter', 'root', 'getData', 'putData'],

  data() {
    return {
      id: null,
      value: null,
      item: null
    }
  },
  computed: {
    hidden() {
      if (typeof this.data.hidden !== 'undefined' && this.data.hidden) {
        return true
      }
      return false
    },
    title() {
      if (this.item === null) {
        return '{空}'
      }
      return this.item.title
    },
    image() {
      if (this.item === null) {
        return '{空}'
      }
      return this.item.image.url
    }
  },
  async mounted() {
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    } else if (typeof this.data.default !== 'undefined') {
      this.value = this.data.default
    }

    this.$on('setId', function (id) {
      this.id = id
    })
    this.refresh()
  },

  methods: {
    click() {
      this.root.metaForm({
        id: this.id,
        schema: this.item.schema
      })
    },
    refresh() {
      if (this.value !== null) {
        getMeta(this.value, {
          expand: 'image, author'
        }).then(response => {
          this.item = response.data
          console.error(this.item)
        })
      }
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
