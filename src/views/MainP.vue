<template>
  <el-scrollbar
    ref="scs"
    :max-height="height + 'px'"
    width="100%"
    @scroll="count"
    id="scs"
  >
    <div
      class="r"
      :style="{ 'min-height': height + 'px' }"
      style="background-color: green"
    >
      1
    </div>
    <div class="r" :style="{ 'min-height': height + 'px' }" style="background-color: red">
      1
    </div>
    <div
      class="r"
      :style="{ 'min-height': height + 'px' }"
      style="background-color: blue"
    >
      1
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      height: "",
      page: 0,
      oldcount: 0,
      lock: 0,
    };
  },
  methods: {
    hello() {},
    getheight() {
      this.height = document.body.clientHeight - 60;
    },
    count() {
      if (this.lock != 1)
        if (this.$refs.scs.wrap$.scrollTop >= this.oldcount)
          this.page = parseInt(
            (this.$refs.scs.wrap$.scrollTop + this.height / 1.5) / this.height
          );
        else
          this.page = parseInt(
            (this.$refs.scs.wrap$.scrollTop + this.height / 3) / this.height
          );
      this.oldcount = this.$refs.scs.wrap$.scrollTop;
    },
    ScrollTop(number = 0, time) {
      if (!time) {
        this.$refs.scs.wrap$.scrollTop = number;
        return number;
      }
      const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime; // 计算循环的次数
      let nowTop = this.$refs.scs.wrap$.scrollTop; // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--;
          this.ScrollTop((nowTop += everTop));
        } else {
          clearInterval(scrollTimer); // 清除计时器
          this.lock = 0;
        }
      }, spacingTime);
    },
  },
  mounted() {
    this.getheight();
    window.addEventListener("resize", this.getheight);
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
  },
  watch: {
    page() {
      //this.$refs.scs.scrollTo(0, 729 * this.page);
      this.lock = 1;
      this.ScrollTop(729 * this.page, 200);

      console.log(this.lock);
      //console.log(this.page);
    },
  },
};
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
</style>
