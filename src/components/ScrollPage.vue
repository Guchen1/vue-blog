<template>
  <div>
    <div
      style="position: fixed; z-index: 1000; right: 30px"
      :style="{ top: height / 2 + 'px' }"
    >
      <el-space size="small" direction="vertical"
        ><div
          v-for="i in (0, maxpage + 1)"
          :key="i"
          @click="lock ? null : jump(i - 1)"
          :class="page == i - 1 ? 'circle-full' : 'circle'"
        ></div>
        <div :class="page == maxpage + 1 ? 'circle-small-full' : 'circle-small'"></div>
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
        v-for="(i, p) in img"
        :key="p"
        :style="{
          'min-height': height + 'px',
          'background-image': 'url(' + i + ')',
        }"
      ></div>

      <div style="text-align: center; line-height: 60px">
        Copyright © 2022
        <a
          href="https://beian.miit.gov.cn/"
          style="text-decoration: none; font-size: 12px"
          :style="{ color: Dark ? '#fff' : '#000' }"
          >苏ICP备2022031828号-1</a
        >
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
let a = function (e) {
  if (e.cancelable) {
    e.preventDefault();
  }
};
let b = function (e) {
  if (e.cancelable) {
    e.preventDefault();
  }
};
let scrollFunction = function (e) {
  e = e || window.event;
  e.preventDefault && e.preventDefault(); //禁止浏览器默认事件
};
export default {
  data() {
    return {
      page: 0,
      oldcount: 0,
      lock: 0,
      maxpage: 0,
      show: 0,
      oldpage: 0,
      disabledoublelock: 0,
      flock: 0,
      timeout: 0,
      allow: 0,
      oldpos: 0,
      imgs: [],
      sec: 0,
    };
  },

  props: {
    height: {
      type: Number,
      default: 0,
    },
    img: {
      type: Array,
      default: () => [],
    },
    Dark: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.maxpage = this.img.length - 1;
  },
  methods: {
    jump(page) {
      this.page = page;
      this.disabledoublelock = 1;
    },
    count() {
      if (this.lock != 1) {
        this.flock = 1;
        if (this.$refs.scs.wrap$.scrollTop - this.maxpage * this.height > 40) {
          this.page = this.maxpage + 1;
          this.oldcount = this.$refs.scs.wrap$.scrollTop;
          this.flock = 0;
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
        this.flock = 0;
      }
      this.oldcount = this.$refs.scs.wrap$.scrollTop;
    },
    ScrollTop(number = 0, time, fix = 0, dis = 0) {
      if (!time) {
        this.$refs.scs.wrap$.scrollTop = number;
        return number;
      }
      const spacingTime = 2; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime; // 计算循环的次数
      let nowTop = this.$refs.scs.wrap$.scrollTop; // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--;
          this.ScrollTop((nowTop += everTop));
        } else {
          clearInterval(scrollTimer); // 清除计时器
          if (fix == 0 && dis == 0) {
            this.lock = 0;
            this.timeout = setTimeout(() => {
              this.lock = 1;
              this.ScrollTop(number, 100, 1);
            }, 300);
          } else {
            this.lock = 0;
          }
        }
      }, spacingTime);
    },
  },

  watch: {
    page() {
      if (this.allow && this.page == this.maxpage) {
        window.addEventListener("wheel", b, { passive: false });
        window.addEventListener("touchmove", b, { passive: false });
        setTimeout(() => {
          window.removeEventListener("touchmove", b, {
            passive: false,
          });

          window.removeEventListener("wheel", b, {
            passive: false,
          });
        }, 100);
        this.ScrollTop(this.height * this.page, 100, this.disabledoublelock, 1);

        return;
      }
      if (this.page < this.maxpage) this.allow = 0;
      //this.$refs.scs.scrollTo(0, 729 * this.page);
      clearTimeout(this.timeout);
      clearTimeout(this.sec);
      // eslint-disable-next-line no-empty
      if (this.page != this.maxpage + 1) {
      } else if (!this.allow) {
        this.allow = 1;

        this.page = this.maxpage;
        this.lock = 0;
      } else this.allow = 0;

      if (
        this.oldpage == this.maxpage + 1 &&
        !this.disabledoublelock &&
        this.allow == 0
      ) {
        this.lock = 0;
        this.sec = setTimeout(() => {
          this.lock = 1;
          this.ScrollTop(
            this.height * this.page,
            Math.abs(this.oldpage - this.page) >= 1
              ? Math.abs(this.oldpage - this.page) * 200
              : 200,
            0,
            this.disabledoublelock
          );
        }, 1000);
        this.oldpage = this.page;
        return;
      }
      if (this.page != this.maxpage + 1) {
        this.lock = 1;
        this.ScrollTop(
          this.height * this.page,
          Math.abs(this.oldpage - this.page) >= 1
            ? Math.abs(this.oldpage - this.page) * 200
            : 200,
          this.disabledoublelock
        );
        this.disabledoublelock = 0;
      }
      this.oldpage = this.page;
      //console.log(this.page);
    },
    lock() {
      if (this.lock == 1) {
        if (document.addEventListener) {
          //firefox
          document.addEventListener("DOMMouseScroll", scrollFunction, false);
        }
        //滚动滑轮触发scrollFunction方法  //ie 谷歌

        document.body.addEventListener("touchmove", a, {
          passive: false,
        });
        window.addEventListener("wheel", scrollFunction, {
          passive: false,
        });
      } else {
        if (document.removeEventListener) {
          //firefox
          document.removeEventListener("DOMMouseScroll", scrollFunction, false);
        }
        //滚动滑轮触发scrollFunction方法  //ie 谷歌
        document.body.removeEventListener("touchmove", a, {
          passive: false,
        });

        window.removeEventListener("wheel", scrollFunction, {
          passive: false,
        });
      }
    },
  },

  deactivated() {
    if (this.$refs.scs != null) this.oldpos = this.$refs.scs.wrap$.scrollTop;
  },
  activated() {
    setTimeout(() => {
      if (this.$refs.scs != null) this.$refs.scs.wrap$.scrollTop = this.oldpos;
    }, 20);
  },
};
</script>

<style scoped>
.el-main {
  padding-bottom: 0px;
}
.circle {
  width: 15px;

  height: 15px;
  cursor: pointer;
  background-color: transparent; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
.circle-full {
  width: 15px;
  cursor: pointer;
  height: 15px;

  background-color: grey; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
.circle-small {
  width: 10px;

  height: 10px;

  background-color: transparent; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
.circle-small-full {
  width: 10px;

  height: 10px;

  background-color: grey; /* Can be set to transparent */

  border: 1px grey solid;

  border-radius: 100px;
}
</style>
