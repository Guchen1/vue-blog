<template>
  <div
    v-if="loaded"
    :style="{ width: width >= 1024 ? '70%' : '90%', 'min-height': height + 'px' }"
    class="center"
  >
    <el-page-header :content="detail.title" @back="$router.back()" />
    <div
      style="white-space: pre-wrap; line-height: initial; padding-top: 15px"
      v-html="detail.content"
    ></div>
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
  methods: {
    a() {
      this.width = window.innerWidth;
    },
  },
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
    await this.$axios.get(this.$server + "/passages?details=" + this.path).then((res) => {
      this.detail = res.data;
      this.loaded = true;
    });

    window.addEventListener("resize", this.a);
    this.$emit("loaded");
  },
  unmounted() {
    window.removeEventListener("resize", this.a);
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
