<template>
  <div
    v-if="loaded"
    :style="{ width: width >= 1024 ? '70%' : '90%', 'min-height': height + 'px' }"
    class="center"
  >
    <el-page-header
      :content="detail.title"
      @back="
        loaded = false;
        $router.back();
      "
    />
    <div style="height: 20px"></div>
    <c-editor :disabled="editorDisabled" :maybeEditorData="editorData"></c-editor>
  </div>
  <LoadingPage v-else />
</template>

<script>
import CEditor from "@/components/CEditor.vue";
import LoadingPage from "./LoadingPage.vue";
export default {
  name: "PostShow",
  components: {
    LoadingPage,
    CEditor,
  },
  props: ["loading", "ready", "height", "path"],
  methods: {
    a() {
      this.width = window.innerWidth;
    },
  },

  data() {
    return {
      q: 0,

      editorDisabled: true,
      editorData: "",
      list: [],
      width: window.innerWidth,
      detail: {},
      loaded: false,
    };
  },

  mounted() {
    this.loaded = false;
    this.$axios.get(this.$server + "/passages?details=" + this.path).then((res) => {
      this.detail = res.data;
      this.loaded = true;
      this.editorData = this.detail.content;
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
