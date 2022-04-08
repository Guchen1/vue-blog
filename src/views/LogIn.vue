<template>
<div :style="{'min-height':height}">4</div>
</template>

<script>
import { defineComponent } from 'vue' 

export default defineComponent({ 
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
})

</script>

<style>

</style>