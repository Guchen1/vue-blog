<template>
  <div :style="{ 'min-height': height + 'px' }">
    <el-container>
      <el-aside
        v-if="width >= 768"
        :style="{ 'min-height': height - 60 + 'px' }"
        width="20%"
        style="margin-left: 10%; padding-top: 20px"
        >Aside</el-aside
      >
      <el-container>
        <el-container
          style="max-width: 800px"
          :style="{ 'min-height': height - 60 + 'px' }"
        >
          <el-header
            style="padding-top: 20px"
            :style="{ width: widthp - 15 + 'px' }"
          >
            <el-row style="padding-right: 0px">
              <el-col :span="18" :xs="14">
                <el-input v-model="input" placeholder="输入以搜索"
                  ><template #prefix>
                    <el-icon class="el-input__icon"
                      ><search
                    /></el-icon> </template
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
              'max-width': mainwidth + 'px',
            }"
            style="padding-bottom: 0px !important"
            id="main"
            ref="main"
          >
            <el-scrollbar
              ref="scroll"
              :max-height="height - 80 + 'px'"
              style="max-width: 800px; padding-right: 20px"
            >
              <div class="example-pagination-block">
                <view-card
                  style="max-width: 800px"
                  v-for="passage in page[current - 1]"
                  :key="passage.id"
                  :id="passage.id"
                  :title="passage.title"
                  :summary="passage.summary"
                  :time="passage.time"
                  :load="load"
                ></view-card>
                <el-pagination
                  background
                  :total="passages.length"
                  v-model:currentPage="current"
                />
              </div> </el-scrollbar
          ></el-main>
        </el-container>
        <el-aside v-if="width >= 1366" style="padding-top: 20px"
          >Aside</el-aside
        >
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ViewCard from "./ViewCard.vue";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
var map = new Map();
export default {
  components: {
    Search,
    ViewCard,
  },
  data() {
    return {
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
    };
  },
  props: ["ready", "height"],
  methods: {
    loadfull() {
      if (this.current == 0) return;
      if (this.scroll != null) this.scroll.scrollTo(0, 0);
      if (this.pageset.has(this.input)&&this.pageset.get(this.input).has(this.current - 1) ) {
        this.page[this.current - 1] = this.pageset.get(this.input).get(this.current - 1);
      } else {
        if (this.page[this.current - 1] == undefined) return;
        if(this.page[this.current - 1].length == 0) return;
        if(!this.pageset.has(this.input))
        this.pageset.set(this.input, new Map());
        this.load = false;
        this.$axios
          .post("http://localhost:8080", {
            id: this.page[this.current - 1],
          })
          .then((response) => {
            if(response.data==null){
              this.page[this.current - 1] = this.pageset.get(this.input).get(this.current - 1);
            return;}
            this.page[this.current - 1] = response.data;
            this.load = true;
            this.pageset.set(this.input, this.pageset.get(this.input).set(this.current - 1, this.page[this.current - 1]));
          });
      }
    },
    getpassage(url) {
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
        this.$axios.get(url).then((res) => {
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
  beforeMount() {
    if (this.input == "" && this.$route.query.key != undefined) {
      this.input = this.$route.query.key;
      this.getpassage("http://localhost:8080/?key=" + this.input);
    } else {
      this.getpassage("http://localhost:8080/");
    }
  },
  mounted() {
    this.widthp = document.getElementById("main").offsetWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.widthp = document.getElementById("main").offsetWidth;
      this.mainwidth = window.innerWidth > 800 ? 800 : window.innerWidth;
    });
  },
  setup() {
    const scroll = ref(null);
    return {
      scroll: scroll.value,
    };
  },
  watch: {
    current() {
      this.loadfull();
    },
    input() {
      if (this.input == this.$route.query.key) return;
      if (this.input != "") {
        this.$router.push({
          query: {
            id: this.input,
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
        this.$axios
          .get("http://localhost:8080/?key=" + this.input)
          .then((res) => {
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
    window.removeEventListener("resize", () => {
      this.width = window.innerWidth;
      this.widthp = document.getElementById("main").offsetWidth;
      this.mainwidth = window.innerWidth > 800 ? 800 : window.innerWidth;
    });
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