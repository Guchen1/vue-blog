<template>
  <el-card
    v-if="link.state == 1"
    shadow="hover"
    :style="{ height: hei + 'px' }"
    :body-style="{ height: hei - 40 + 'px' }"
    ><el-avatar :size="hei - 40" :src="link.img" />
    <div
      :style="{ height: hei - 40 + 'px', width: 'calc(100% - 86px)' }"
      style="display: inline-block; vertical-align: top"
    >
      <div style="text-align: center; font-weight: bold">{{ link.name }}</div>
      <div style="word-wrap: break-word; text-align: center; padding-top: 15px">
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
    return {
      hei: 126,
    };
  },
  components: {
    InstantRender,
  },
  props: { link: { type: Object } },
  mounted() {},

  methods: {},
};
</script>

<style>
.name {
  text-align: center;
  font-weight: bold;
}
.intro {
  word-wrap: break-word;
  text-align: center;
  padding-top: 10px;
}
.textm {
  display: inline-block;
}
</style>
