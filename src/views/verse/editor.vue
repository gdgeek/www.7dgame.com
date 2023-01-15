<template>
  <div class="verse-index">
    <rete-verse />
  </div>
</template>

<script>
import ReteVerse from '@/components/Rete/ReteVerse.vue'

export default {
  name: 'VerseEditor',
  components: {
    ReteVerse
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
