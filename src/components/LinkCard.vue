<template>
  <el-card
    v-if="link.state == 1"
    shadow="hover"
    :style="{ height: hei + 'px' }"
    :body-style="{ height: hei - 40 + 'px' }"
    ><el-avatar :size="hei - 40" :src="link.img" />
    <div
      :style="{
        height: hei - 40 + 'px',
        width: 'calc( 100% - ' + t + ' )',
      }"
      style="
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: top;
        line-height: 16px;
      "
    >
      <div style="text-align: center; font-weight: bold">{{ link.name }}</div>
      <br style="" />
      <div style="word-wrap: break-word; text-align: center">
        {{ link.details }}
      </div>
    </div>
  </el-card>
  <InstantRender v-else :id="link.un"></InstantRender>
</template>

<script>
import InstantRender from "./InstantRender.vue";
export default {
  data() {
    return {};
  },
  components: {
    InstantRender,
  },
  computed: {
    t() {
      return this.hei - 40 + "px";
    },
  },
  props: { link: { type: Object }, hei: { type: Number, default: 0 } },

  methods: {},
};
</script>

<style></style>
