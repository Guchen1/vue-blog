<template>
  <scroll-page :height="height" :Dark="isDark" :img="img"></scroll-page>
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
  props: {
    height: {
      type: Number,
      default: 0,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
</style>
