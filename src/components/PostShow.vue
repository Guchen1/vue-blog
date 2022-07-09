<template>
  <div
    v-if="loaded"
    :style="{ width: width >= 1024 ? '70%' : '90%', 'min-height': height + 'px' }"
    class="center"
  >
    <el-page-header :content="detail.title" @back="$router.back()" />
    jsjsjsj
  </div>
  <LoadingPage v-else />
</template>

<script>
import LoadingPage from "./LoadingPage.vue";
export default {
  components: {
    LoadingPage,
  },
  props: ["loading", "ready", "height", "path"],
  methods: {},
  name: "PostShow",
  data() {
    return {
      list: [],
      width: window.innerWidth,
      detail: {},
      loaded: false,
    };
  },
  async mounted() {
    this.loaded = false;
    await this.$axios.get(this.$server + "?details=" + this.path).then((res) => {
      this.detail = res.data;
      this.loaded = true;
    });
    this.detail = { title: "第一篇", content: "这是一篇文章" };
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
    this.$emit("loaded");
  },
  unmounted() {},
  updated() {
    this.$emit("loaded");
  },
};
</script>

<style>
.center {
  margin: 0 auto;
}
</style>
