<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="cancel()"
      width="95%"
      :show-close="false"
    >
      <span slot="title" class="dialog-footer">
        <mr-p-p-header
          :sorted="sorted"
          :searched="searched"
          @search="search"
          @sort="sort"
        >
          <el-tag>
            <b>{{ message }}!!!</b>
          </el-tag>
        </mr-p-p-header>
      </span>

      <waterfall :options="{}" v-if="items !== null">
        <waterfall-item
          v-for="(item, index) in items"
          :key="index"
          style="width: 230px"
        >
          <el-card style="width: 220px" class="box-card">
            <div slot="header">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <span slot="header" class="mrpp-title">
                  <b class="card-title" nowrap>{{ title(item) }}</b>
                </span>
                <img
                  v-if="item.image"
                  style="width: 100%; height: 180px"
                  fit="contain"
                  :src="item.image.url"
                  lazy
                />

                <div style="width: 100%; text-align: center">
                  {{ item.created_at }}
                </div>
              </el-card>
            </div>
            <div class="clearfix">
              <el-button type="primary" size="mini" @click="selected(item)">
                选择
              </el-button>
            </div>
            <div class="bottom clearfix" />
          </el-card>
          <br />
        </waterfall-item>
      </waterfall>

      <span slot="footer" class="dialog-footer">
        <el-row :gutter="0">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-pagination
              :current-page="pagination.current"
              :page-count="pagination.count"
              :page-size="pagination.size"
              :total="pagination.total"
              layout="prev, pager, next, jumper"
              background
              @current-change="handleCurrentChange"
            ></el-pagination>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-button-group>
              <el-button size="mini" @click="selected(null)">清 空</el-button>
              <el-button size="mini" @click="dialogVisible = false">
                取 消
              </el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

import Card from '@/components/MrPP/MrPPCard'
import MrPPHeader from '@/components/MrPP/MrPPHeader'
export default {
  name: 'ResourceDialog',
  components: {
    Waterfall,
    WaterfallItem,
    Card,
    MrPPHeader
  },
  props: {
    message: {
      type: String,
      default: '选择相应空间'
    }
  },
  data() {
    return {
      dialogVisible: false,
      items: null,
      sorted: '-created_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },

  methods: {
    title(item) {
      if (item.title !== undefined) {
        return item.title
      }

      if (item.name !== undefined) {
        return item.name
      }
      return 'title'
    },
    open() {
      this.dialogVisible = true
      this.refresh()
    },
    close() {
      this.dialogVisible = false
      //   this.refresh()
    },
    sort: function (value) {
      this.sorted = value
      this.refresh()
    },
    search: function (value) {
      this.searched = value
      this.refresh()
    },

    selected(data = null) {
      this.$emit('selected', data)
      this.dialogVisible = false
    },
    cancel() {
      this.$emit('cancel')
    },
    handleCurrentChange: function (page) {
      this.pagination.current = page
      this.refresh()
      // console.log(this.pagination.current)
    },
    async refresh() {
      const self = this
      this.$emit(
        'getDatas',
        {
          sorted: self.sorted,
          searched: self.searched,
          current: self.pagination.current
        },
        response => {
          console.log(response.headers)
          self.pagination = {
            current: parseInt(response.headers['x-pagination-current-page']),
            count: parseInt(response.headers['x-pagination-page-count']),
            size: parseInt(response.headers['x-pagination-per-page']),
            total: parseInt(response.headers['x-pagination-total-count'])
          }
          //alert(response.data)
          console.error(response)

          if (response.data) {
            this.items = response.data
          }
        }
      )
    }
  }
}
</script>
