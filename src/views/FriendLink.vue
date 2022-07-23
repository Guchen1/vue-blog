<template>
  <div class="rq" :style="{ 'min-height': height - 80 + 'px' }">
    <div style="height: 30px"></div>
    <el-row
      :style="{
        'padding-left': width > 700 ? '15%' : '5%',
        'padding-right': width > 700 ? '15%' : '5%',
      }"
      ><el-col
        :span="width > 1440 ? 6 : width > 1200 ? 8 : width < 480 ? 24 : 12"
        style="padding: 5px"
        v-for="(link, index) in links"
        :key="index"
        ><LinkCard :link="link"></LinkCard
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import LinkCard from "../components/LinkCard.vue";

export default defineComponent({
  components: {
    LinkCard,
  },
  data() {
    return {};
  },
  computed: {
    links() {
      return this.$store.getters.getlinks;
    },
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style>
.el-main {
  padding-bottom: 0px;
}

.el-card__body {
}
</style>
