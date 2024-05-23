<template>
  <div>
    <br/>
    <VerseDialog ref="dialog" @selected="selected"/>
    <el-container>
      <el-header>
        <mr-p-p-header
          :sorted="sorted"
          :searched="searched"
          sortByTime="created_at"
          sortByName="title"
          @search="search"
          @sort="sort"
        >
          <el-button-group :inline="true">
            <el-button size="mini" type="primary" @click="addGuide()">
              <font-awesome-icon icon="plus" />
              &nbsp;
              <span class="hidden-sm-and-down">创建【关卡】</span>
            </el-button>
          </el-button-group>
        </mr-p-p-header>
      </el-header>
      <el-main>
        <el-card>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="游戏id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="顺序"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
  <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group> 
      </el-table-column>
    </el-table>
  </el-card>
      </el-main>
      <el-footer>
        <el-card class="box-card">
          <el-pagination
            :current-page="pagination.current"
            :page-count="pagination.count"
            :page-size="pagination.size"
            :total="pagination.total"
            layout="prev, pager, next, jumper"
            background
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-footer>
    </el-container>
    
  
  </div>
</template>

<script>
import MrPPHeader from '@/components/MrPP/MrPPHeader'
import { getVpGuides } from '@/api/v1/vp-guide.js'
import VerseDialog from '@/components/MrPP/VerseDialog.vue'
export default {
  name: 'GameIndex',

  components: {
    VerseDialog,
    MrPPHeader,
  },
  methods: {
    selected(item) { 
      alert(item.id)
      //alert(JSON.stringify(item))
    },
    cancel() {
     // this.$refs.verseDialog.close()
    },
    refresh() {
      //this.getMetas()
    },
    addGuide() {
      alert(this.$refs.dialog)
      this.$refs.dialog.open()
      //this.$router.push({ name: 'MetaAdd' })
    },
    editor(id) {
      //this.$router.push({ name: 'MetaEdit', params: { id } })
    },
    del(id) {
      this.$confirm('此操作将永久删除该关卡, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGuide(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    refresh() {
      getVpGuides().then(res => {
        this.items = res.data
      })
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.refresh()
    },
    search(searched) {
      this.searched = searched
      this.refresh()
    },
    sort(sorted) {
      this.sorted = sorted
      this.refresh()
    }
  },
  mounted() {
    getVpGuides().then(res => {
      //this.tableData = res.data
    })
  }, 
  
  data() {
    return {
      items: null,
      sorted: '-created_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
