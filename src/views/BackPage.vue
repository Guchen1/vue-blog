<template>
  <el-container style="height: 100%; width: 100%">
    <el-aside width="190px" v-if="width >= 576">
      <el-menu><el-sub-menu index="1">123</el-sub-menu></el-menu></el-aside
    >
    <el-main class="m" :style="{ 'max-width': width - 190 + 'px' }">
      <CEditor></CEditor>
    </el-main>
  </el-container>
</template>

<script>
import CEditor from "../components/CEditor.vue";

export default {
  components: {
    // eslint-disable-next-line
    CEditor,
  },
  methods: {
    getwidth() {
      this.width = document.body.clientWidth;
      this.px = this.width - 190 + "px";
    },
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  activated() {
    this.getwidth();
    window.addEventListener("resize", this.getwidth);
  },
  deactivated() {
    window.removeEventListener("resize", this.getwidth);
  },
  data() {
    return {
      width: 0,
      px: "0px",
    };
  },
};
</script>
<style>
.m {
  padding: 0;
  flex-wrap: wrap;
  overflow-x: hidden;
}
.ck {
}
</style>
