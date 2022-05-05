<template>
  <div
    :style="{ width: width >= 1024 ? '70%' : '90%', 'min-height': height + 'px' }"
    class="center"
  >
    <el-page-header :content="detail.title" @back="$router.back()" />
  </div>
</template>

<script>
export default {
  props: ["loading", "ready", "height", "path"],
  methods: {},
  name: "PostShow",
  data() {
    return {
      list: [],
      width: window.innerWidth,
      detail: {},
    };
  },
  async mounted() {
    await this.$axios
      .get("http://124.223.53.17:8080?details=" + this.path)
      .then((res) => {
        this.detail = res.data;
      });
    this.detail = { title: "第一篇", content: "这是一篇文章" };
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
    this.$emit("loaded");
  },
  unmounted() {
    window.removeEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
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
