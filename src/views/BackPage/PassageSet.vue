<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="el-fade-in-linear" mode="out-in">
        <component :key="$route.name" :is="Component"></component>
      </Transition>
    </template>
  </RouterView>
</template>

<script>
export default {
  name: "PassageSet",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style></style>
