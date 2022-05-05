<template>
  <div :style="{ 'min-height': height + 'px' }">
    <el-container>
      <el-aside
        v-if="width >= 820"
        :style="{
          'min-height': height - 60 + 'px',
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
            'min-height': height - 60 + 'px',
            'max-width': width >= 1440 ? '70%' : '800px',
          }"
        >
          <el-header style="padding-top: 20px" :style="{ width: widthp - 15 + 'px' }">
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
              'min-height': height - 60 + 'px',
              'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
            }"
            style="padding-bottom: 0px !important"
            id="main"
            ref="main"
          >
            <div class="example-pagination-block">
              <el-scrollbar
                ref="scroll"
                :max-height="height - 80 - (width < 768 ? 28 : 36) + 'px'"
                style="padding-right: 20px"
                :style="{
                  'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
                }"
              >
                <view-card
                  :style="{
                    'max-width': width >= 1440 ? '100%' : mainwidth + 'px',
                  }"
                  v-for="passage in page[current - 1]"
                  :key="passage.id"
                  :id="passage.id"
                  :title="passage.title"
                  :summary="passage.summary"
                  :time="passage.time"
                  :load="load"
                ></view-card>
              </el-scrollbar>
              <el-pagination
                layout="prev, pager, next"
                :total="passages.length"
                v-model:currentPage="current"
                :small="width < 768"
                :pager-count="5"
              />
            </div>
          </el-main>
        </el-container>
        <el-aside v-if="width >= 1366" style="padding-top: 20px">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const ViewCard = defineAsyncComponent(() => import("./ViewCard.vue"));
import { Search } from "@element-plus/icons-vue";
//import { ref } from "vue";
const PassageFilter = defineAsyncComponent(() => import("./PassageFilter.vue"));

var map = new Map();
export default {
  components: {
    Search,
    ViewCard,
    PassageFilter,
  },
  data() {
    return {
      currentold: 1000,
      current: 1,
      margin: 0,
      mainwidth: window.innerWidth > 800 ? 800 : window.innerWidth,
      widthp: 0,
      width: window.innerWidth,
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
    };
  },
  props: ["ready", "height"],
  methods: {
    detect() {
      this.widthtemp = window.innerWidth;
    },
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
        this.load = false;
        this.$axios
          .post("http://124.223.53.17:8080", {
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
            this.load = true;
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
      await this.getpassage("http://124.223.53.17:8080/?key=" + this.input);
    } else {
      await this.getpassage("http://124.223.53.17:8080/");
    }
  },
  mounted() {
    setTimeout(() => {
      if (document.getElementById("main") != null)
        this.widthp = document.getElementById("main").offsetWidth - 5;
    }, 300);

    window.addEventListener("resize", this.detect);
  },
  watch: {
    widthtemp() {
      this.width = window.innerWidth;
      setTimeout(() => {
        if (document.getElementById("main") != null)
          this.widthp = document.getElementById("main").offsetWidth - 5;
      }, 100);
      this.mainwidth = window.innerWidth > 800 ? 800 : window.innerWidth;
    },
    $route() {
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
        this.$axios.get("http://124.223.53.17:8080/?key=" + this.input).then((res) => {
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
  beforeUnmount() {
    window.removeEventListener("resize", this.detect);
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
</style>
