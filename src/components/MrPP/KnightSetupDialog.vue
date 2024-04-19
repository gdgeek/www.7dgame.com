<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="95%"
      height="95px"
      :show-close="false"
      @close="cancel()"
    >
      <span slot="title" class="dialog-footer">
        <mr-p-p-header
          :sorted="owner.sorted"
          :searched="owner.searched"
          @search="search"
          @sort="sort"
        >
          <el-tag>
            <b>选择资源</b>
          </el-tag>
        </mr-p-p-header>
        <el-divider content-position="left">
          <el-tag
            v-if="owner.searched !== ''"
            size="mini"
            closable
            @close="clearSearched()"
          >
            {{ owner.searched }}
          </el-tag>
        </el-divider>
      </span>
      <waterfall v-if="owner !== null && owner.items !== null" :options="{}">
        <waterfall-item
          v-for="(item, index) in owner.items"
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
              <el-button size="mini" @click="doSelect(item)">选择</el-button>
            </div>
            <div class="bottom clearfix" />
          </el-card>

          <br />
        </waterfall-item>
      </waterfall>
      <template v-else>
        <el-skeleton />
      </template>

      <span slot="footer" class="dialog-footer">
        <el-row :gutter="0">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-pagination
              :current-page="owner.pagination.current"
              :page-count="owner.pagination.count"
              :page-size="owner.pagination.size"
              :total="owner.pagination.total"
              layout="prev, pager, next, jumper"
              background
              @current-change="handleCurrentChange"
            />
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-button-group>
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

import { getMetas } from '@/api/v1/meta'
import {
  getVerseKnights,
  postVerseKnight,
  deleteVerseKnight
} from '@/api/v1/verse-knight'
import MrPPHeader from '@/components/MrPP/MrPPHeader'
export default {
  name: 'KnightDialog',
  components: {
    Waterfall,
    WaterfallItem,
    MrPPHeader
  },
  data() {
    return {
      verse_id: -1,
      value: null,

      owner: {
        items: null,
        sorted: '-created_at',
        searched: '',
        pagination: { current: 1, count: 1, size: 20, total: 20 }
      },
      dialogVisible: false
    }
  },
  props: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      this.refresh()
    },
    title(item) {
      if (item.title !== undefined) {
        return item.title
      }

      if (item.name !== undefined) {
        return item.name
      }
      return 'title'
    },
    async open(value, verse_id) {
      this.owner = {
        items: null,
        sorted: '-created_at',
        searched: '',
        pagination: { current: 1, count: 1, size: 20, total: 20 }
      }

      this.verse_id = verse_id
      this.value = value

      this.refreshOwner()

      this.dialogVisible = true
    },
    async refreshOwner() {
      const response = await getMetas(
        this.owner.sorted,
        this.owner.searched,
        this.owner.pagination.current,
        'image,verseKnights'
      )

      this.owner.items = response.data
    },
    close() {
      this.dialogVisible = false
    },
    sort: function (value) {
      this.owner.sorted = value
      this.refresh()
    },
    search: function (value) {
      this.owner.searched = value
      this.refresh()
    },
    clearSearched() {
      this.owner.searched = ''
      this.refresh()
    },
    doSelect(data) {
      this.$emit('selected', data)
      this.dialogVisible = false
    },
    doEmpty() {
      this.$emit('selected', null)
      this.value = null
      this.dialogVisible = false
    },

    selected(data = null) {
      this.$emit('selected', data)
      this.dialogVisible = false
    },
    cancel() {
      this.$emit('cancel')
    },
    handleCurrentChange: function (page) {
      this.owner.pagination.current = page
      this.refresh()
    },
    async refresh() {
      await this.refreshOwner()
    }
  }
}
</script>
