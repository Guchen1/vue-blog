<template>
  <scroll-page :height="height" :img="img"></scroll-page>
</template>

<script>
import ScrollPage from "../components/ScrollPage.vue";
export default {
  created() {},
  components: {
    ScrollPage,
  },
  data() {
    return {
      img: ["1.jpg", "2.jpg", "3.jpg", ""],
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
</style>
