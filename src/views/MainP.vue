<template>
  <div class='r' :style="{'min-height':height}">1</div>
</template>

<script>
export default {
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
}
</script>

<style>
.el-main{
  padding-bottom: 0px;
}
</style>