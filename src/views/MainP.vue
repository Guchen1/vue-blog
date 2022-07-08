<template>
  <div>
    <div
      style="position: fixed; z-index: 10000; right: 30px"
      :style="{ top: height / 2 + 'px' }"
    >
      <el-space size="small" direction="vertical"
        ><div
          v-for="i in (0, maxpage + 1)"
          :key="i"
          :class="page == i - 1 ? 'circle-full' : 'circle'"
        ></div>
      </el-space>
    </div>
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
      <div
        class="r"
        :style="{ 'min-height': height + 'px' }"
        style="background-color: red"
      >
        1
      </div>
      <div
        class="r"
        :style="{ 'min-height': height + 0.5 + 'px' }"
        style="background-color: blue"
      >
        1
      </div>
      <div style="height: 60px">1</div>
    </el-scrollbar>
  </div>
</template>

<script>
var scrollFunction = function (e) {
  e = e || window.event;
  e.preventDefault && e.preventDefault(); //禁止浏览器默认事件
  if (e.wheelDelta) {
    //判断浏览器IE，谷歌滑轮事件
    if (e.wheelDelta > 0) {
      //当滑轮向上滚动时
    }
    if (e.wheelDelta < 0) {
      //当滑轮向下滚动时
    }
  } else if (e.detail) {
    //Firefox滑轮事件
    if (e.detail > 0) {
      //当滑轮向上滚动时
    }
    if (e.detail < 0) {
      //当滑轮向下滚动时
    }
  }
};
export default {
  data() {
    return {
      height: "",
      page: 0,
      oldcount: 0,
      lock: 0,
      maxpage: 2,
      show: 0,
    };
  },
  methods: {
    hello() {},
    getheight() {
      this.height = document.body.clientHeight - 60;
    },
    count() {
      if (this.lock != 1) {
        if (this.$refs.scs.wrap$.scrollTop - this.maxpage * this.height > 10) {
          this.page = this.maxpage + 1;
          return;
        }
        if (this.$refs.scs.wrap$.scrollTop >= this.oldcount) {
          this.show = 1;
          this.page = parseInt(
            (this.$refs.scs.wrap$.scrollTop + this.height / 1.5) / this.height
          );
        } else {
          this.show = 0;
          this.page = parseInt(
            (this.$refs.scs.wrap$.scrollTop + this.height / 3) / this.height
          );
        }
      }

      this.oldcount = this.$refs.scs.wrap$.scrollTop;
    },
    ScrollTop(number = 0, time, fix = 0) {
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
          if (fix == 0) {
            this.timeout = setTimeout(() => {
              this.ScrollTop(number, 100, 1);
            }, 100);
          } else {
            this.lock = 0;
          }
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
      if (this.page == this.maxpage) this.ScrollTop(this.height * this.page + 0.5, 200);
      else this.ScrollTop(this.height * this.page, 200);
      //console.log(this.page);
    },
    lock() {
      if (this.lock == 1) {
        if (document.addEventListener) {
          //firefox
          document.addEventListener("DOMMouseScroll", scrollFunction, false);
        }
        //滚动滑轮触发scrollFunction方法  //ie 谷歌
        window.addEventListener("mousewheel", scrollFunction, {
          passive: false,
        });
      } else {
        if (document.removeEventListener) {
          //firefox
          document.removeEventListener("DOMMouseScroll", scrollFunction, false);
        }
        //滚动滑轮触发scrollFunction方法  //ie 谷歌
        window.removeEventListener("mousewheel", scrollFunction, {
          passive: false,
        });
      }
    },
  },
};
</script>

<style>
.el-main {
  padding-bottom: 0px;
}
.circle {
  width: 10px;

  height: 10px;

  background-color: transparent; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
.circle-full {
  width: 10px;

  height: 10px;

  background-color: grey; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
</style>
