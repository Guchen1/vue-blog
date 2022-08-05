<template>
  <div style="position: relative; width: 100%">
    <div
      v-if="loaded"
      :style="{
        width: width >= 1024 ? '70%' : '90%',
        'min-height': height - 80 + 'px',
        display: ss ? 'none' : 'block',
      }"
      class="center"
      id="fix"
    >
      <el-page-header :content="detail.title" title="返回" @back="$router.back()" />

      <div style="height: 20px"></div>
      <c-editor
        :disabled="editorDisabled"
        :isDark="isDark"
        :maybeEditorData="editorData"
      ></c-editor>
    </div>
    <LoadingPage :style="{ 'min-height': height - 80 + 'px' }" v-else />
  </div>
</template>

<script>
import CEditor from "@/components/CEditor.vue";
import LoadingPage from "@/components/LoadingPage.vue";
export default {
  name: "PostShow",
  components: {
    LoadingPage,
    CEditor,
  },
  props: ["loading", "ready", "height", "path", "isDark"],
  methods: {
    a() {
      this.width = window.innerWidth;
    },
  },

  data() {
    return {
      q: 0,
      ss: false,
      editorDisabled: true,
      editorData: "",
      list: [],
      width: window.innerWidth,
      detail: {},
      loaded: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.loaded = false;
    next();
  },
  mounted() {
    this.$emit("nomain");
    this.$axios
      .get(this.$server + "/passages?details=" + this.$route.params.id)
      .then((res) => {
        if (res.status == 200) {
          this.detail = res.data;
          setTimeout(() => {
            this.loaded = true;
          }, 50);

          this.editorData = this.detail.content;
        }
      })
      .catch(() => {
        if (this.$route.name == "doc-detail") this.$router.push("/404");
      });

    window.addEventListener("resize", this.a);
    this.$emit("loaded");
  },
  unmounted() {
    window.removeEventListener("resize", this.a);
  },
};
</script>

<style>
.center {
  margin: 0 auto;
}
.el-page-header__left {
  min-width: 55px;
  display: flex;
  align-items: center;
}
</style>
