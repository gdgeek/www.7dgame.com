<template>
  <div class="background-screen-border">
    <AppleReality></AppleReality>

    <el-card class="box-card">
      <el-alert
        title="此域名是苹果热情的AR开发者为苹果公司保护。"
        type="error"
      ></el-alert>
    </el-card>

    <el-card class="box-card">
      <br />
      <book
        document_path="/blog/document"
        :items="book"
        category_path="/blog/category"
      />
      <!-- -->
    </el-card>
  </div>
</template>

<script>
import AppleReality from '@/components/Web/AppleReality'
import Book from '@/components/Book.vue'

import BusinessList from '@/components/Web/BusinessList.vue'

export default {
  name: 'WebIndex',
  components: {
    BusinessList,
    AppleReality,
    Book
  },
  data() {
    return {
      book: [{ label: '元气弹执行计划', type: 'category', id: 87 }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
</style>
