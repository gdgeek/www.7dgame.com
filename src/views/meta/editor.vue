<template>
  <div class="meta-editor-index">
    <!--  <resource-dialog
      @selected="resourceSelect"
      @cancel="resourceSetup()"
      @getDatas="getResources"
      ref="dialog"
      :message="resourceMessage"
    />-->

    <rete-meta ref="rete" class="rete" />
  </div>
</template>

<script>
import ReteMeta from '@/components/Rete/ReteMeta.vue'

import ResourceDialog from '@/components/MrPP/MrPPResourceDialog.vue'
import { getResources } from '@/api/resources'
export default {
  name: 'MetaEditor',
  components: {
    ReteMeta,
    ResourceDialog
  },

  destroyed() {
    // this.setBreadcrumbs({ list: [] })
  },

  methods: {
    //...mapMutations(['resourceSelect', 'resourceSetup']),
    //...mapMutations('breadcrumb', ['setBreadcrumbs'])
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}
.rete {
  max-width: 91vw;
  min-height: calc(73vh);
  max-height: calc(73vh);
}
#rete {
  border-style: solid;
  border-width: 1px;
}
</style>
