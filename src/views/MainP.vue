<template>
  <scroll-page :height="height" :img="img"></scroll-page>
</template>

<script>
import ScrollPage from "../components/ScrollPage.vue";
export default {
  created() {
    this.img = this.$store.state["meta-info"].mainimg;
  },
  components: {
    ScrollPage,
  },
  data() {
    return {
      img: [],
    };
  },
  activated() {
    this.$emit("main");
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
