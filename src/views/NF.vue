<template>
  <div class='root' :style="{height:height,'line-height':height}" style='text-align:center'>404 Not Found</div>
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
      this.height = document.body.clientHeight - 160 + "px";
    },
  },
  mounted() {
    this.getheight();
    window.addEventListener("resize", this.getheight);
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
  },
};
</script>

<style>

</style>