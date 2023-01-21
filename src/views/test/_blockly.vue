<template>
  <div class="verse-code">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link :to="'/verse/rete-verse?id=' + id">
              <el-link :underline="false">【宇宙】</el-link>
            </router-link>
            /逻辑
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="save()">
                <font-awesome-icon icon="save" />
                保存
              </el-button>
            </el-button-group>
          </div>

          <blockly />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Blockly from '@/components/Blockly.vue'
import { mapState } from 'vuex'
export default {
  name: 'VerseCode',
  components: {
    Blockly
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  mounted() {},
  methods: {}
}
</script>
