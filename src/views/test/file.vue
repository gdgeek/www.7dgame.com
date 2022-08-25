<template>
  <div>
    {{ count }}
    <button @click="increment">自增</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapState({
      store: state => state.config.advanced
    })
  },
  methods: {
    increment() {
      const self = this

      self.store
        .fileHas('b4588534775361ef248e240617b4e9d1', '.stl', null)
        .then(data => {
          if (data !== null) {
            console.error(data)
          } else {
          }
        })
        .catch(err => {
          console.error(err)
        })
      /*
      console.error('==2==')
      self.store.fileConvert(
        'b4588534775361ef248e240617b4e9d1.stl',
        p => {
          console.error(p)
        },
        key => {
          console.error(key)
        }
      )
      console.error('====')
      /* self.store
        .fileConvert('b4588534775361ef248e240617b4e9d1.stl', p => {
          console.error(p)
        })
        .then(key => {
          alert(1)
        })
        .catch(err => {
          console.error(err)
        })*/
    }
  }
}
</script>
