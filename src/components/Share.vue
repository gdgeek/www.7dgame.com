<template>
  <div>
    <el-dialog
      title="共享给其他用户"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ]"
        >
          <el-input
            type="username"
            v-model="form.username"
            placeholder="请输入用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="相关信息" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确 认</el-button>

          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <br />
    <el-card>
      <el-descriptions
        class="margin-top"
        title="共享列表"
        label-class-name="info-content-label"
        :column="1"
        size="small"
        v-if="items"
        border
      >
        <el-descriptions-item v-for="item in items" :key="item.id">
          <template slot="label">
            <el-tooltip
              class="item"
              effect="light"
              :content="item.user.username"
              placement="top"
            >
              <span>{{ item.user.nickname }}</span>
            </el-tooltip>
            <el-button type="text" size="mini" @click="del(item.id)">
              <font-awesome-icon class="icon" icon="times" />
            </el-button>
          </template>

          <span>{{ JSON.parse(item.info).content }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <el-button style="width: 100%" @click="open()" type="primary" size="mini">
        <font-awesome-icon icon="handshake" />
        &nbsp;共享给好友
      </el-button>
    </el-card>
  </div>
</template>

<script>
import {
  postVerseShare,
  getVerseShareList,
  deleteVerseShare
} from '@/api/v1/verse-share'
export default {
  name: 'Share',
  props: {
    verseId: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      items: null,
      dialogVisible: false,
      form: {
        username: '',
        content: null
      }
    }
  },
  components: {},
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      try {
        const r = await getVerseShareList(this.verseId)
        this.items = r.data
        //alert(JSON.stringify(this.items))
      } catch (e) {
        console.error(e.message)
      }
    },
    open() {
      this.dialogVisible = true
    },

    async del(id) {
      const self = this
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        await deleteVerseShare(id)
        self.refresh()
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
    resetForm() {
      this.$refs['form'].resetFields()
    },
    onSubmit() {
      const self = this
      this.$refs['form'].validate(valid => {
        if (valid) {
          postVerseShare({
            username: self.form.username,
            verse_id: self.verseId,
            info: JSON.stringify({ content: self.form.content })
          }).finally(() => {
            self.refresh()
            self.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          self.dialogVisible = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-content-label {
  width: 70px;
}
.icon {
  width: 10px;
}
</style>
