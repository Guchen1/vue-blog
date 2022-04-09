<template>
  <div :style="{ 'min-height': height + 'px' }">
    <el-container>
      <el-aside
        :style="{ 'min-height': height - 60 + 'px' }"
        width="15%"
        style="margin-left: 10%; padding-top: 20px"
        >Aside</el-aside
      >
      <el-container>
        <el-header style="padding-top: 20px;padding-right: 8%">
            <el-input v-model="input" placeholder="输入以搜索" />
        </el-header>
        <el-scrollbar :max-height=" height - 60 + 'px'">
        <el-main
          :style="{ 'min-height': height - 60 + 'px' }"
          style="padding-right: 8%"
          >
          <view-card
            v-for="passage in passages"
            :key="passage.id"
            :id="passage.id"
            :title="passage.title"
            :content="passage.content"
          ></view-card
        ></el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ViewCard from "./ViewCard.vue";
export default {
  data() {
    return {
      input: "",
      passages: [
        {
          id: 1,
          title: "第一篇",
          content: "第一篇内容",
        },
        {
          id: 2,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 3,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 4,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 5,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 6,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 7,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 8,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 9,
          title: "第二篇",
          content: "第二篇内容",
        },
        {
          id: 10,
          title: "第二篇",
          content: "第二篇内容",
        },
      ],
    };
  },
  components: {
    "view-card": ViewCard,
  },
  props: ["ready", "height"],
  mounted() {
    setTimeout(() => {
      this.$emit("loaded");
    }, 1000);
  },
};
</script>

<style>
</style>