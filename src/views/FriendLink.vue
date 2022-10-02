<template>
  <div class="rq" :style="{ 'min-height': height - 80 + 'px' }">
    <el-row
      :style="{
        'padding-left': width > 700 ? '15%' : '5%',
        'padding-right': width > 700 ? '15%' : '5%',
      }"
      ><el-col
        :span="width > 1890 ? 6 : width > 1200 ? 8 : width < 580 ? 24 : 12"
        style="padding: 5px"
        v-for="(link, index) in links"
        :key="index"
        ><LinkCard :link="link" :hei="hei"></LinkCard
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
  activated() {
    this.$emit("nomain");
  },
  computed: {
    links() {
      let a = this.$store.getters.getlinks;
      let order = function (a, b) {
        return a.sort - b.sort;
      };
      a.sort(order);
      console.log(a);
      return a;
    },
    hei() {
      return this.$store.getters.getcardheight;
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
