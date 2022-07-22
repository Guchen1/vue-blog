<template>
  <div class="rq" :style="{ 'min-height': height - 80 + 'px' }">
    <div style="height: 30px"></div>
    <el-row
      :style="{
        'padding-left': width > 700 ? '15%' : '5%',
        'padding-right': width > 700 ? '15%' : '5%',
      }"
    >
      <el-col
        :span="width > 1440 ? 6 : width > 1200 ? 8 : width < 480 ? 24 : 12"
        style="padding: 5px"
      >
        <el-card shadow="hover"
          ><el-avatar :size="50" :src="'/img/my.bmp'" />
          <div style="display: inline-block; height: 50px; width: calc(100% - 50px)">
            <div class="name">Chen</div>
            <div class="intro">顾晨</div>
          </div>
        </el-card></el-col
      ><el-col
        :span="width > 1440 ? 6 : width > 1200 ? 8 : width < 480 ? 24 : 12"
        style="padding: 5px"
      >
        <el-card shadow="hover"
          ><el-avatar :size="50" :src="'/img/my.bmp'" />
          <div style="display: inline-block; height: 50px; width: calc(100% - 50px)">
            <div class="name">Chen</div>
            <div class="intro">顾晨</div>
          </div></el-card
        ></el-col
      ><el-col
        :span="width > 1440 ? 6 : width > 1200 ? 8 : width < 480 ? 24 : 12"
        style="padding: 5px"
      >
        <el-card shadow="hover"
          ><el-avatar :size="50" :src="'/img/my.bmp'" />
          <div style="display: inline-block; height: 50px; width: calc(100% - 50px)">
            <div class="name">Chen</div>
            <div class="intro">顾晨</div>
          </div></el-card
        ></el-col
      ></el-row
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
.name {
  font-weight: bold;
  width: 100%;
  height: 40%;
  line-height: 40%;
  text-align: center;
}
.intro {
  word-wrap: break-word;
  width: 100%;
  height: 60%;
  padding-top: 10px;
  line-height: 60%;
  text-align: center;
}
</style>
