<template>
  
  <div :style="{ 'min-height': height+'px' }">2234</div>

</template>

<script>
export default {
  props: ['loading', "ready", "height", "path"],
  methods: {
    
  },
  mounted() {
    
      this.$emit('loaded');

  },
  updated() {

      this.$emit('loaded');
    
  },
};
</script>

<style>
</style>