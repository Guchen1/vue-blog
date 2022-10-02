<template>
  <div style="position: relative; width: 100%">
    <el-page-header
      :content="detail.title"
      title="返回"
      @back="$router.back()"
      :style="{
        'margin-left': width >= 1024 ? '15%' : '5%',
        'margin-right': width >= 1024 ? '15%' : '5%',
      }"
    />
    <div style="height: 20px"></div>
    <el-scrollbar
      :max-height="height - 120 + 'px'"
      v-if="loaded"
      :style="{
        width: width >= 1024 ? '70%' : '90%',
        'min-height': height - 155 + 'px',
        display: ss ? 'none' : 'block',
      }"
      class="center"
      id="fix"
    >
      <c-editor
        :disabled="editorDisabled"
        :isDark="isDark"
        :maybeEditorData="editorData"
      ></c-editor>
    </el-scrollbar>
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
  props: ["loading", "ready", "height", "path", "isDark", "width"],

  data() {
    return {
      q: 0,
      ss: false,
      editorDisabled: true,
      editorData: "",
      list: [],
      detail: {},
      loaded: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.loaded = false;
    next();
  },

  mounted() {
    this.$emit("post");
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

    this.$emit("loaded");
  },
  unmounted() {
    this.$emit("nopost");
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
