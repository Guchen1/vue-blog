<template>
  <div>
    <el-container style="height: 100%">
      <el-aside style="z-index: 0; max-width: 20%">
        <el-menu
          ><el-sub-menu index="1" style="z-index: 0">123</el-sub-menu></el-menu
        ></el-aside
      >
      <el-main id="m"><c-editor></c-editor></el-main>
    </el-container>
  </div>
</template>

<script>
import CEditor from "../components/CEditor.vue";

export default {
  components: {
    CEditor,
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {};
  },
};
</script>
<style>
#m {
  padding: 0;
  z-index: 10000;
}
</style>
