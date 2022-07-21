<template>
  <div class="rq" :style="{ 'min-height': height - 80 + 'px' }">3</div>
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
