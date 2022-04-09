<template>
  
  <div :style="{ 'min-height': height+'px' }">2234</div>

</template>

<script>
export default {
  props: ['loading', "ready", "height", "path"],
  methods: {
    
  },
  mounted() {
    setTimeout(() => {
      this.$emit('loaded');
    }, 1000);
  },
};
</script>

<style>
</style>