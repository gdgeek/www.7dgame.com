<template>
  <div>
    <br />
    <el-container>
      <el-header>
        <mr-p-p-header
          :sorted="sorted"
          :searched="searched"
          sortByTime="create_at"
          sortByName="title"
          @search="search"
          @sort="sort"
        >
          <el-button-group :inline="true">
            <el-button size="mini" type="primary" @click="addKnight()">
              <font-awesome-icon icon="plus" />
              &nbsp;
              <span class="hidden-sm-and-down">创建【骑士】</span>
            </el-button>
          </el-button-group>
        </mr-p-p-header>
      </el-header>
      <el-main>
        <el-row>
          <div v-if="items">
            <waterfall :options="{}">
              <!-- slice Control number of items -->
              <waterfall-item
                v-for="(item, index) in items"
                :key="index"
                style="width: 330px"
              >
                <el-card style="width: 320px" class="box-card">
                  <div slot="header">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                      <span slot="header" class="mrpp-title">
                        <b class="card-title" nowrap>{{ item.title }}</b>
                      </span>
                      <router-link :to="'/knight/edit?id=' + item.id">
                        <img
                          v-if="item.image === null"
                          src="@/assets/image/none.png"
                          style="
                            width: 100%;
                            height: 270px;
                            object-fit: contain;
                          "
                        />
                        <img
                          v-else
                          style="width: 100%; height: 270px"
                          fit="contain"
                          :src="item.image.url"
                          lazy
                        />
                      </router-link>
                    </el-card>
                  </div>
                  <div class="clearfix">
                    <router-link
                      slot="enter"
                      :to="'/knight/edit?id=' + item.id"
                    >
                      <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                  </div>
                  <div class="bottom clearfix" />
                </el-card>
                <br />
              </waterfall-item>
            </waterfall>
          </div>
        </el-row>
      </el-main>
      <el-footer>
        <el-card class="box-card">
          <el-pagination
            :current-page="pagination.current"
            :page-count="pagination.count"
            :page-size="pagination.size"
            :total="pagination.total"
            layout="prev, pager, next, jumper"
            background
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

import { getKnights, postKnight } from '@/api/v1/knight'
import MrPPHeader from '@/components/MrPP/MrPPHeader'
export default {
  name: 'KnightIndex',
  components: {
    Waterfall,
    WaterfallItem,
    MrPPHeader
  },
  mounted() {
    this.refresh()
  },
  methods: {
    sort: function (value) {
      this.sorted = value
      this.refresh()
    },
    search: function (value) {
      this.searched = value
      this.refresh()
    },
    async addKnight() {
      try {
        const input = await this.$prompt('请输骑士名称', '提示(3-20个字符)', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: value => {
            if (!value) {
              return '骑士名称不能为空'
            }
            if (value.length < 2) {
              return '骑士名称不能小于2个字符'
            }
            if (value.length > 20) {
              return '骑士名称不能大于20个字符'
            }
          }
        })
        this.$message({
          type: 'success',
          message: '骑士名称是: ' + input.value
        })

        const data = {
          title: input.value,
          content: '{}',
          image: null
        }
        const response = await postKnight(data)
        await this.editKnight(response.data.id)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async editKnight(id) {
      this.$router.push({ path: '/knight/edit', query: { id } })
    },
    handleCurrentChange: function (page) {
      this.pagination.current = page
      this.refresh()
    },
    async refresh() {
      const response = await getKnights(
        this.sorted,
        this.searched,
        this.pagination.current,
        'image,author'
      )
      this.items = response.data
    }
  },

  data() {
    return {
      items: null,
      sorted: '-create_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  }
}
</script>
