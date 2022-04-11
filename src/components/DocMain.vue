<template>
  <div :style="{ 'min-height': height + 'px' }">
    <el-container>
      <el-aside v-if="width>=768"
        :style="{ 'min-height': height - 60 + 'px' }"
        width="20%"
        style="margin-left: 10%; padding-top: 20px"
        >Aside</el-aside
      >
      <el-container>
        <el-container style="max-width: 800px;" :style="{ 'min-height': height - 60 + 'px' }">
          <el-header style="padding-top: 20px;" :style="{width:widthp-15+'px'}">
          <el-row style="padding-right:0px;">
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
          :style="{ 'min-height': height - 60 + 'px' ,'max-width':mainwidth+'px'}"
          style="padding-bottom:0px!important;"
          id='main'
        >
          <el-scrollbar :max-height="height - 80 + 'px'" style="max-width: 800px;padding-right:20px">
            
              <view-card
                style="max-width: 800px"
                v-for="passage in passages"
                :key="passage.id"
                :id="passage.id"
                :title="passage.title"
                :content="passage.content"
                :time="passage.time"
              ></view-card></el-scrollbar
        ></el-main>
        </el-container>
        <el-aside v-if='width>=1366' style="padding-top: 20px;" >Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ViewCard from "./ViewCard.vue";
import { Search } from "@element-plus/icons-vue";
export default {
  components: {
    Search,
    ViewCard,
  },
  data() {
    return {
      margin:0,
      mainwidth:window.innerWidth>800?800:window.innerWidth,
      widthp:0,
      width:window.innerWidth,
      input: "",
      sort: "时间倒序",
      passages: [
        {
          id: 1,
          title: "第一篇",
          content: "第一篇内容",
          time: "2020-05-05",
        },
        {
          id: 2,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 3,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 4,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 5,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 6,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 7,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 8,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 9,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
        {
          id: 10,
          title: "第二篇",
          content: "第二篇内容",
          time: "2020-05-05",
        },
      ],
    };
  },
  props: ["ready", "height"],
  mounted() {
    this.widthp = document.getElementById('main').offsetWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.widthp = document.getElementById('main').offsetWidth;
      this.mainwidth=window.innerWidth>800?800:window.innerWidth;
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {
      this.width = window.innerWidth;
      this.widthp = document.getElementById('main').offsetWidth;
      this.mainwidth=window.innerWidth>800?800:window.innerWidth;
    });
  },
};
</script>

<style>
input {
  margin-right: 5px;
}
.el-main{
  padding-bottom: 0px;
}
</style>