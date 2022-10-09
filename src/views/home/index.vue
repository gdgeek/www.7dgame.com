<template>
  <div>
    <el-tabs v-if="!environment.local" type="border-card" lazy>
      <el-tab-pane label="首页">
        <document :post-id="999" :category="true" />
        <br />
        <document-list :category-id="74" />
      </el-tab-pane>
      <el-tab-pane label="相关下载">
        <document-list :category-id="77" />
      </el-tab-pane>
      <el-tab-pane label="案例教程">
        <document-list :category-id="79" />
      </el-tab-pane>
      <el-tab-pane label="搞笑视频"></el-tab-pane>
    </el-tabs>

    <el-tabs v-else type="border-card" lazy>
      <el-tab-pane :label="information.data.title">
        <local-page />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import url from 'url'
import { mapState } from 'vuex'
import environment from '@/environment.js'
import Document from '@/components/Document.vue'
import DocumentList from '@/components/Home/DocumentList.vue'
import LocalPage from '@/components/Home/LocalPage.vue'
export default {
  name: 'DocumentIndex',
  components: {
    Document,
    DocumentList,
    LocalPage
  },
  computed: {
    environment() {
      return environment
    },
    ...mapState({
      information: state => state.information
    })
  }
}
</script>
