<template>
  <div>
    <el-form :inline="false" size="mini">
      <el-form-item :inline="true" class="el-form-item" :label="data.title">
        <el-select v-model="value" placeholder="请选择">
          <template v-if="url !== null" slot="prefix">
            <el-image
              style="width: 25px; height: 25px; padding: 2px 0 0 0"
              :src="url"
              :fit="'contain'"
            />
          </template>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">
              <el-image
                style="width: 30px; height: 30px"
                :src="item.image"
                :fit="'contain'"
              />
            </span>
            <span style="float: right; color: #8492a6; font-size: 10px">
              {{ item.label }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      options: [],
      value_: ''
    }
  },
  computed: {
    url() {
      let ret = null
      const self = this
      this.options.find(function (value, index, arr) {
        if (value.value === self.value) {
          ret = value.image
        }
      })
      return ret
    },
    value: {
      get() {
        return this.value_
      },
      set(value) {
        this.value_ = value
        this.refresh()
      }
    }
  },
  watch: {
    'root.$store.state.resource.polygenList': function () {
      this.setList(this.root.$store.state.resource.polygenList)
    }
  },
  mounted() {
    this.setList(this.root.$store.state.resource.polygenList)
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    } else if (typeof this.data.default !== 'undefined') {
      this.value = this.data.default
    }
    this.refresh()
  },
  methods: {
    setList(list) {
      if (list === null) {
        return
      }
      const self = this
      this.options = []
      list.forEach(item => {
        self.options.push({
          image: item.image,
          value: item.id,
          label: item.name
        })
      })
    },
    refresh() {
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>
