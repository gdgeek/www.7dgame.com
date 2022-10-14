<template>
  <div>
    <el-form :inline="true" ref="value" size="mini">
      <el-form-item :inline="true" class="el-form-item" label="场景">
        <div v-if="value_ === -1">
          <el-button @click="select()" size="mini">未指派</el-button>
        </div>
        <div v-else>
          <div v-if="item === null"><i>载入中</i></div>
          <div v-else>
            <el-popover
              placement="top-start"
              :title="'场景:' + item.title"
              width="200"
              trigger="hover"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="item.image.url"
                fit="contain"
              ></el-image>
              <el-checkbox v-model="occlusion" border>模型遮挡</el-checkbox>
              <el-button-group slot="reference">
                <el-button type="primary" plain @click="select()" size="mini">
                  {{ item.id }}:{{ item.title }}
                </el-button>

                <el-button
                  @click="click()"
                  size="mini"
                  icon="el-icon-edit"
                ></el-button>
              </el-button-group>
            </el-popover>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var qs = require('querystringify')
var path = require('path')
import { getSpace } from '@/api/v1/space'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      item: null,
      value_: -1,
      occlusion: false
    }
  },
  computed: {
    value: {
      get() {
        return this.value_
      },
      set(value) {
        if (this.value_ !== value) {
          this.value_ = value
          this.refresh()
        }
      }
    }
  },
  mounted() {
    const value = this.getData(this.data.key)

    if (typeof value !== 'undefined') {
      this.value = value
    } else if (typeof this.data.default !== 'undefined') {
      this.value = this.data.default
    } else {
      this.refresh()
    }
  },
  methods: {
    click() {
      this.root.$router.push({
        path: '/editor/index',
        query: { id: this.root.$route.query.id }
      })
    },
    select() {
      this.root.$store.commit('setOnSpace', this.onSpace)
    },

    onSpace(data) {
      if (data === null) {
        this.value = -1
        this.item = null
      } else {
        this.value = data.id
        this.item = data
      }
    },

    async refresh() {
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      const self = this
      if (
        self.value !== -1 &&
        (this.item === null || this.value != this.item.id)
      ) {
        try {
          const response = await getSpace(self.value, {
            expand: 'author,image'
          })
          if (response.data !== null) {
            this.item = response.data
          }
        } catch (err) {
          alert(err)
        }
      }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>
