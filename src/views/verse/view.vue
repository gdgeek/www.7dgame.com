<template>
  <div class="verse-view">
    <el-dialog :title="'修改信息'" :visible.sync="dialog" width="70%">
      <mr-p-p-message-from ref="editor" :data="briefing" @post="postMessage" />
    </el-dialog>
    <el-row :gutter="20" style="margin: 28px 18px 0">
      <el-col :sm="16">
        <el-card v-if="verse" class="box-card">
          <div slot="header">
            <b id="title">{{ word.project }}名称：</b>
            <span>{{ verse.name }}</span>
          </div>

          <div class="box-item">
            <el-image
              v-if="verse.image === null"
              fit="contain"
              style="width: 100%; height: 300px"
            />
            <el-image
              v-else
              fit="contain"
              style="width: 100%; height: 300px"
              :src="verse.image.url"
            />
          </div>
        </el-card>
        <br />

        <el-card v-if="verse !== null" class="box-card">
          <el-button
            style="width: 100%"
            type="primary"
            size="mini"
            @click="comeIn()"
          >
            <font-awesome-icon icon="edit" />
            &nbsp;编辑{{ word.project }}
          </el-button>
          <br />
        </el-card>

        <message
          v-if="message !== null"
          ref="message"
          :message_id="message.id"
          @setMessage="setMessage"
        />
        <reply v-if="message !== null" :message_id="message.id" />
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">
            <b>{{ word.project }}信息</b>
          </div>
          <div class="box-item">
            <info-content v-if="verse" :info="JSON.parse(verse.info)" />

            <aside style="margin-top: 10px; margin-bottom: 30px">
              <el-button-group style="float: right" />
            </aside>
          </div>
          <verse-toolbar :verse="verse" @deleted="deleted" @changed="changed" />

          <br />
        </el-card>

        <br />
        <el-card v-if="$can('root')">
          <el-button
            v-if="verseOpen === null"
            style="width: 100%"
            type="primary"
            size="mini"
            @click="open()"
          >
            <font-awesome-icon icon="eye" />
            &nbsp;开放{{ word.project }}
          </el-button>

          <el-button
            v-else
            style="width: 100%"
            type="primary"
            size="mini"
            @click="close()"
          >
            <font-awesome-icon icon="eye-slash" />
            &nbsp;关闭{{ word.project }}
          </el-button>
        </el-card>
        <share v-if="canShare" :verseId="verse.id" />

        <br />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MrPPMessageFrom from '@/components/MrPP/MrPPMessageFrom.vue'
import { getVerse } from '@/api/v1/verse'

import Reply from '@/components/Reply'
import InfoContent from '@/components/InfoContent.vue'
import Message from '@/components/Message.vue'
import Share from '@/components/Share.vue'

import { AbilityWorks } from '@/ability/ability'
import VerseToolbar from '@/components/VerseToolbar.vue'
import { postMessage } from '@/api/v1/message'
import { postVerseOpen, deleteVerseOpen } from '@/api/v1/verse-open'
export default {
  name: 'VerseView',
  data() {
    return {
      verse: null,
      dialog: false,
      briefing: { title: 'sdfsdf', body: 'eee' }
    }
  },

  computed: {
    ...mapState({
      word: state => state.settings.word,
      tagsMap: state => state.tags.tagsMap
    }),
    canShare() {
      const self = this

      if (self.verse === null) {
        return false
      }

      return self.$can('update', new AbilityWorks(self.verse.author_id))
    },
    id() {
      return parseInt(this.$route.query.id)
    },
    message() {
      if (this.verse === null) {
        return null
      }
      return this.verse.message
    },
    verseOpen() {
      if (this.verse === null) {
        return null
      }
      return this.verse.verseOpen
    },
    info() {
      if (this.verse === null || this.verse.info === null) {
        return null
      }
      return JSON.parse(this.verse.info)
    }
  },
  components: {
    MrPPMessageFrom,
    Message,
    VerseToolbar,
    InfoContent,
    Reply,
    Share
  },
  created: function () {
    const self = this
    this.refresh()
    if (self.tagsMap == null) {
      self.refreshTags()
    }
  },
  methods: {
    ...mapActions('tags', {
      refreshTags: 'refreshTags'
    }),
    refresh() {
      const self = this
      getVerse(self.id, 'image,verseOpen,author, message').then(res => {
        self.verse = res.data
        if (self.message !== null) {
          self.briefing = self.message
        } else {
          self.briefing = {
            title: '【工程】名称：' + self.verse.name,
            body: this.info.description
          }
        }
      })
    },
    deleted: function (verse) {
      const self = this
      self.$router.push({ path: '/verse/index' })
    },
    changed: function (verse) {
      const self = this
      self.refresh()
    },
    setMessage(message) {
      const self = this
      self.verse.message = message
    },
    postMessage: function (data) {
      const self = this
      const info = { target: { type: 'verse', id: self.id } }
      data.info = JSON.stringify(info)
      postMessage(data).then(response => {
        self.verse.message = response.data
        postVerseOpen({ verse_id: this.id, message_id: self.message.id }).then(
          res => {
            self.verse.verseOpen = res.data
            self.dialog = false
            this.$message({
              message: '分享成功',
              type: 'success'
            })
          }
        )
      })
    },
    close() {
      const self = this
      deleteVerseOpen(self.verseOpen.id).then(res => {
        self.verse.verseOpen = null
        self.verse.message = null
        this.$message({
          message: '停止共享',
          type: 'success'
        })
      })
    },

    open() {
      const self = this
      self.dialog = true
    },
    comeIn() {
      const self = this
      self.$router.push({ path: '/verse/editor', query: { id: self.id } })
    }
  }
}
</script>
