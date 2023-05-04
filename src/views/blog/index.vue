<template>
  <div class="background-screen-border">
    <el-card class="box-card">
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
import Giant from '@/components/Web/Giant'
import Book from '@/components/Book.vue'
export default {
  name: 'WebIndex',
  components: {
    Giant,
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
