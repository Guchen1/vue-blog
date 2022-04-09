<template>
  <div :style="{'min-height':height}">
      <view-card></view-card>
  </div>
</template>

<script>
import ViewCard from './ViewCard.vue'
export default {
    components: {
        'view-card': ViewCard,
    },
    props: [ "ready", "height"],
    mounted() {
    setTimeout(() => {
      this.$emit('loaded');
    }, 1000);
  },
}
</script>

<style>

</style>