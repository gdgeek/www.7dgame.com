<template>
  <div>
    <el-form :inline="true" ref="value" size="mini">
      <el-form-item :inline="true" class="el-form-item" label="骑士">
        <div v-if="value_ === null">
          <el-button @click="select()" size="mini">未指派</el-button>
        </div>
        <div v-else>
          <div v-if="item === null">
            <i>载入中</i>
          </div>
          <div v-else>
            <el-popover
              placement="top-start"
              :title="'标题:' + item.title"
              width="200"
              trigger="hover"
            >
              <el-image
                v-if="item.image"
                style="width: 100px; height: 100px"
                :src="item.image.url"
                fit="contain"
              ></el-image>
              <el-button-group slot="reference">
                <el-button type="primary" plain @click="select()" size="mini">
                  {{ value_ }}:{{ item.title }}
                </el-button>
              </el-button-group>
            </el-popover>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getKnight } from '@/api/v1/knight'
import { putMetaKnight, getMetaKnight } from '@/api/v1/meta-knight'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      item: null,
      id: null,
      value_: null
    }
  },
  computed: {
    value: {
      get() {
        return this.value_
      },
      set(value) {
        if (this.value_ != value) {
          this.value_ = value
          this.refresh()
        }
      }
    }
  },
  mounted() {
    const self = this

    this.$on('setId', async function (id) {
      self.id = id
      let r = await getMetaKnight(id)
      const value = r.data.knight_id
      if (typeof value !== 'undefined') {
        this.value = value
      } else if (typeof this.data.default !== 'undefined') {
        this.value = this.data.default
      }
      self.reload()
    })
  },
  methods: {
    select() {
      this.root.$store.commit('knightCallback', this.onKnight)
    },

    onKnight(data) {
      if (data === null) {
        this.value = null
        this.item = null
      } else {
        this.value = data.id
        this.item = data
      }
      this.reload()
    },
    reload() {
      const self = this
      if (
        this.value !== null &&
        (this.item === null || this.value != this.item.id)
      ) {
        getKnight(self.value, {
          expand: 'author,image'
        }).then(response => {
          if (response.data !== null) {
            self.item = response.data
          }
        })
      }
    },
    refresh() {
      putMetaKnight(this.id, { knight_id: this.value })
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>
