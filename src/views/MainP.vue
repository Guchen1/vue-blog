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
      img: ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/p1.jpg"],
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
