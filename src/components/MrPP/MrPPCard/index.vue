<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <span slot="header" class="mrpp-title">
            <b class="card-title" nowrap>{{ item.name }}</b>
          </span>

          <img
            v-if="item.image === null"
            src="@/assets/image/none.png"
            style="width: 100%; height: 300px; object-fit: contain"
          />
          <el-image
            v-else
            style="width: 100%; height: 300px"
            fit="contain"
            :src="item.image.url"
            lazy
          />
        </el-card>

        <slot name="info" />
      </div>
      <div class="clearfix">
        <slot name="enter">入口</slot>

        <el-button-group style="float: right" :inline="true">
          <el-button
            type="plain"
            size="mini"
            icon="el-icon-edit"
            @click="named()"
          />
          <el-button
            type="plain"
            size="mini"
            icon="el-icon-delete"
            @click="deleted()"
          />
          &nbsp;
        </el-button-group>
      </div>
      <div class="bottom clearfix" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MrPPCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    named() {
      const self = this
      this.$emit('named', self.item)
    },
    deleted() {
      const self = this
      this.$emit('deleted', self.item)
    }
  }
}
</script>

<style scoped>
.mrpp-title {
  font-size: 15px;
  padding: 0px 0px 0px 0px;
  color: #666;
}
.card-title {
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
