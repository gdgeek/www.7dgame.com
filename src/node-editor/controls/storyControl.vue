<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" label="故事">
      <el-switch
        v-model="content.switch"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>

      <el-timeline v-if="content.switch">
        <div v-if="scripts">
          <el-timeline-item
            v-for="data in scripts"
            :key="data.id"
            :timestamp="data.title"
            placement="top"
          >
            <el-button-group>
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editScript(data)"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-edit-outline"
                @click="enterScript(data)"
              ></el-button>
              <el-button size="mini" icon="el-icon-arrow-up"></el-button>
              <el-button size="mini" icon="el-icon-arrow-down"></el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                @click="delScript(data.id)"
              ></el-button>
            </el-button-group>
          </el-timeline-item>
        </div>
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="addScript"
        >
          增加脚本
        </el-button>
      </el-timeline>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  getVerseScripts,
  postVerseScript,
  delVerseScripts,
  putVerseScript
} from '@/api/v1/verse-script'

import { v4 as uuidv4 } from 'uuid'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      id: this.root.$route.query.id,
      scripts: [],
      content: {
        sorted: [],
        switch: false
      }
    }
  },
  watch: {
    content: {
      handler(val) {
        if (this.data) {
          this.putData(this.data.key, JSON.stringify(val))
        }
        this.emitter.trigger('process', { status: 'node' })
      },
      deep: true
    }
  },
  computed: {
    value: {
      get() {
        return JSON.stringify(this.content)
      }
    }
  },
  methods: {
    async enterScript(item) {
      this.root.$router.push({
        path: '/verse/verse-script',
        query: {
          id: item.id
        }
      })
    },
    async editScript(item) {
      try {
        const input = await this.$prompt('请输入脚本新名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputPattern: /^.{2,10}$/,
          inputValue: item.title,
          inputErrorMessage: '请输入2-10个字符'
        })
        const response = await putVerseScript(item.id, {
          title: input.value
        })

        await this.refresh()
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      } catch (e) {
        console.error(e)
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async addScript() {
      try {
        const input = await this.$prompt('请输入脚本名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputPattern: /^.{2,10}$/,

          inputErrorMessage: '请输入2-10个字符'
        })
        const response = await postVerseScript({
          verse_id: this.id,
          title: input.value,
          uuid: uuidv4()
        })

        await this.refresh()
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      } catch (e) {
        console.error(e)
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async delScript(id) {
      try {
        await this.$confirm('此操作将永久删除该脚本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const response = await delVerseScripts(id)

        await this.refresh()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async refresh() {
      const response = await getVerseScripts(this.root.$route.query.id)
      this.scripts = response.data
      this.content.sorted = []
      this.scripts.forEach(item => {
        this.content.sorted.push(item.id)
      })
    }
  },
  async mounted() {
    const val = this.getData(this.data.key)
    if (typeof val !== 'undefined') {
      this.content = JSON.parse(val)
    } else if (typeof this.data.default !== 'undefined') {
      this.content = JSON.parse(this.data.default)
    }
    await this.refresh()
  }
}
</script>