<template>
  <div class="rq" :style="{ 'min-height': height }">3</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      height: "",
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 140 + "px";
    },
  },
  mounted() {
    this.getheight();
    window.addEventListener("resize", this.getheight);
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
  },
});
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
</style>
