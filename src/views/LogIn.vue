<template>
  <div :style="{ 'min-height': height - 80 + 'px' }">4</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
</style>
