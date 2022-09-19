<template>
  <div style="position: relative; width: 100%">
    <div :style="{ 'min-height': height - 80 + 'px' }" v-if="load">
      <el-container>
        <el-aside
          v-if="width >= 820"
          :style="{
            'min-height': height - 140 + 'px',
            'margin-left': width >= 2200 ? '15%' : width >= 1220 ? '6%' : '5%',
            width: width >= 1220 ? '20%' : '30%',
          }"
          style="padding-top: 20px"
          ><passage-filter
            :v1="value1"
            :v2="value2"
            :cl="checkList"
            @emit="
              (a, b, c) => {
                value1 = a;
                value2 = b;
                checkList = c;
              }
            "
          ></passage-filter
        ></el-aside>
        <el-container>
          <el-container
            style="max-width: 800px"
            :style="{
              'min-height': height - 140 + 'px',
              'max-width': width >= 1440 ? '70%' : '800px',
            }"
          >
            <el-header
              :style="{
                'padding-top': width <= 660 ? '0px' : '20px',
                width: widthp - 15 + 'px',
              }"
            >
              <el-row style="padding-right: 0px">
                <el-col v-if="width < 820" :span="4"
                  ><el-popover
                    v-if="width < 820"
                    trigger="click"
                    placement="bottom-start"
                    width="235px"
                  >
                    <template #reference>
                      <el-button style="width: 100%">筛选</el-button>
                    </template>
                    <passage-filter
                      :k="1"
                      :v1="value1"
                      :v2="value2"
                      :cl="checkList"
                      @emit="
                        (a, b, c) => {
                          value1 = a;
                          value2 = b;
                          checkList = c;
                        }
                      "
                    ></passage-filter> </el-popover
                ></el-col>
                <el-col :span="width < 820 ? 14 : 18" :xs="10">
                  <el-input v-model="input" placeholder="输入以搜索"
                    ><template #prefix>
                      <el-icon class="el-input__icon"><search /></el-icon> </template
                  ></el-input>
                </el-col>
                <el-col :span="6" :xs="10">
                  <el-select
                    v-model="sort"
                    class="m-2"
                    placeholder="Select"
                    style="width: 100%"
                  >
                    <el-option label="时间顺序" value="from" />
                    <el-option label="时间倒序" value="to" />
                  </el-select>
                </el-col>
              </el-row>
            </el-header>
            <el-main
              :style="{
                'min-height': height - 140 + 'px',
                'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
                'padding-top': width <= 600 ? '0px' : '20px',
              }"
              style="padding-bottom: 0px !important"
              id="main"
              ref="main"
            >
              <div>
                <el-scrollbar
                  ref="scroll"
                  :max-height="height - 160 - (width < 600 ? 8 : 36) + 'px'"
                  style="padding-right: 20px"
                  :style="{
                    'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
                  }"
                  ><transition-group name="list" mode="out-in">
                    <view-card
                      class="ssss"
                      :style="{
                        'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
                      }"
                      v-for="passage in page[current - 1]"
                      :key="passage.id"
                      :id="passage.id"
                      :title="passage.title"
                      :summary="passage.summary"
                      :time="passage.time"
                      :width="width"
                      :mwidth="mwidth"
                      :load="load"
                    ></view-card>
                  </transition-group>
                </el-scrollbar>
                <el-pagination
                  style="position: absolute; bottom: 0px"
                  layout="prev, pager, next"
                  :total="passages.length"
                  v-model:currentPage="current"
                  :small="width < 660"
                  :pager-count="5"
                />
              </div>
            </el-main>
          </el-container>
          <el-aside v-if="width >= 1366" style="padding-top: 20px">Aside</el-aside>
        </el-container>
      </el-container>
    </div>
    <LoadingPage :style="{ 'min-height': height - 80 + 'px' }" v-else />
  </div>
</template>

<script>
import ViewCard from "@/components/ViewCard.vue";
import { Search } from "@element-plus/icons-vue";
//import { ref } from "vue";
import LoadingPage from "@/components/LoadingPage.vue";

import PassageFilter from "@/components/PassageFilter.vue";
var map = new Map();
export default {
  components: {
    Search,
    ViewCard,
    PassageFilter,
    LoadingPage,
  },
  data() {
    return {
      nowscroll: 0,
      currentold: 1000,
      current: 1,
      margin: 0,
      mainwidth: window.innerWidth > 800 ? 800 : window.innerWidth,
      widthp: 0,
      input: "",
      sort: "时间倒序",
      passages: "",
      page: Array(),
      pageset: new Map(),
      load: false,
      value1: undefined,
      value2: undefined,
      checkList: undefined,
      widthtemp: 1,
      mwidth: 0,
    };
  },
  props: ["height", "width"],
  methods: {
    loadfull() {
      if (this.current == 0) return;
      this.currentold = this.current;
      if (this.$refs.scroll != null && this.$refs.scroll.scrollTo != undefined) {
        this.$refs.scroll.scrollTo(0, 0);
        this.$refs.scroll.update();
      }
      if (
        this.pageset.has(this.input) &&
        this.pageset.get(this.input).has(this.current - 1)
      ) {
        this.page[this.current - 1] = this.pageset.get(this.input).get(this.current - 1);
      } else {
        if (this.page[this.current - 1] == undefined) return;
        if (this.page[this.current - 1].length == 0) return;
        if (!this.pageset.has(this.input)) this.pageset.set(this.input, new Map());

        this.$axios
          .post(this.$server + "/card", {
            id: this.page[this.current - 1],
          })
          .then((response) => {
            if (response.data == null) {
              this.page[this.current - 1] = this.pageset
                .get(this.input)
                .get(this.current - 1);
              return;
            }
            this.page[this.current - 1] = response.data;

            this.pageset.set(
              this.input,
              this.pageset
                .get(this.input)
                .set(this.current - 1, this.page[this.current - 1])
            );
          });
      }
    },
    async getpassage(url) {
      if (map.has(this.input)) {
        this.page = [];
        this.passages = map.get(this.input);
        if (this.passages == []) return;
        for (let i = 0; i < this.passages.length; i++) {
          if (i % 10 == 0) {
            this.page.push(Array());
          }
          this.page[parseInt(i / 10)].push(this.passages[i]);
        }
        if (this.current == 1) this.loadfull();
        else this.current = 1;
      } else {
        await this.$axios.get(url).then((res) => {
          this.passages = [];
          this.page = [];
          if (res.data == null) {
            map.set(this.input, []);
            this.passages = [];
            this.page = [];
            return;
          }
          this.passages = res.data;
          for (let i = 0; i < this.passages.length; i++) {
            if (i % 10 == 0) {
              this.page.push(Array());
            }
            this.page[parseInt(i / 10)].push(this.passages[i]);
          }
          map.set(this.input, this.passages);
          if (this.current == 1) this.loadfull();
          else this.current = 1;
        });
      }
    },
  },
  async beforeMount() {
    if (this.input == "" && this.$route.query.key != undefined) {
      this.input = this.$route.query.key;
      await this.getpassage(this.$server + "/passages?key=" + this.input);
    } else {
      await this.getpassage(this.$server + "/passages");
    }
  },
  activated() {
    let a = () => {
      if (this.$refs.scroll == undefined) {
        setTimeout(a, 20);
        return;
      }
      console.log(this.$refs.scroll);
      this.$refs.scroll.setScrollTop(this.nowscroll);
    };
    setTimeout(a, 100);
    this.$emit("nomain");
    setTimeout(() => {
      if (document.getElementById("main") != null) {
        this.widthp = document.getElementById("main").offsetWidth - 5;
      }
      if (document.getElementsByClassName("ssss")[0] != null) {
        this.mwidth = document.getElementsByClassName("ssss")[0].offsetWidth;
      }
      this.load = true;
    }, 300);
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "doc-detail") {
      next();
      this.nowscroll = this.$refs.scroll.wrap$.scrollTop;
    } else {
      this.nowscroll = 0;
      next();
    }
  },
  deactivated() {
    this.$refs.scroll.wrap$.scrollTop = this.nowscroll;
  },
  watch: {
    width() {
      setTimeout(() => {
        if (document.getElementById("main") != null)
          this.widthp = document.getElementById("main").offsetWidth - 5;
        if (document.getElementsByClassName("ssss")[0] != null)
          this.mwidth = document.getElementsByClassName("ssss")[0].offsetWidth;
      }, 100);
      this.mainwidth = window.innerWidth > 800 ? 800 : window.innerWidth;
    },
    $route() {
      setTimeout(() => {
        if (document.getElementById("main") != null) {
          this.widthp = document.getElementById("main").offsetWidth - 5;
        }
      }, 200);
      this.$refs.scroll.scrollTo(0, 0);
      this.$refs.scroll.update();
    },
    current() {
      this.loadfull();
    },
    input() {
      if (this.input == this.$route.query.key) return;
      if (this.input != "") {
        this.$router.push({
          query: {
            key: this.input,
          },
        });
      } else {
        this.$router.push({
          query: {},
        });
      }
      if (map.has(this.input)) {
        this.page = [];
        this.passages = map.get(this.input);
        if (this.passages == []) return;
        for (let i = 0; i < this.passages.length; i++) {
          if (i % 10 == 0) {
            this.page.push(Array());
          }
          this.page[parseInt(i / 10)].push(this.passages[i]);
        }
        if (this.current == 1) this.loadfull();
        else this.current = 1;
      } else {
        this.$axios.get(this.$server + "/passages?key=" + this.input).then((res) => {
          if (res.data == null) {
            map.set(this.input, []);
            this.passages = [];
            this.page = [];
            return;
          }
          this.passages = [];
          this.page = [];
          this.passages = res.data;
          for (let i = 0; i < this.passages.length; i++) {
            if (i % 10 == 0) {
              this.page.push(Array());
            }
            this.page[parseInt(i / 10)].push(this.passages[i]);
          }
          map.set(this.input, this.passages);
          if (this.current == 1) this.loadfull();
          else this.current = 1;
        });
      }
    },
  },
};
</script>

<style>
input {
  margin-right: 5px;
}
.el-main {
  padding-bottom: 0px;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
</style>
