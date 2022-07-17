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
        :style="{ 'min-height': height + 5 + 'px' }"
        style="background-color: blue"
      >
        1
      </div>
      <div style="height: 60px; text-align: center; line-height: 60px">
        Copyright © 2022
      </div>
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
      page: 0,
      oldcount: 0,
      lock: 0,
      maxpage: 2,
      show: 0,
      oldpage: 0,
      disabledoublelock: 0,
      flock: 0,
      timeout: 0,
      allow: 0,
      oldpos: 0,
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    jump(page) {
      this.page = page;
      this.disabledoublelock = 1;
    },
    count() {
      if (this.lock != 1) {
        this.flock = 1;
        if (this.$refs.scs.wrap$.scrollTop - this.maxpage * this.height > 10) {
          this.page = this.maxpage + 1;
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
      if (this.page < this.maxpage) this.allow = 0;
      //this.$refs.scs.scrollTo(0, 729 * this.page);
      if (this.page != this.maxpage + 1) clearTimeout(this.timeout);
      else if (!this.allow) {
        this.page = this.maxpage;
        this.allow = 1;
      } else this.allow = 0;
      this.lock = 1;
      if (this.oldpage == this.maxpage + 1 && !this.disabledoublelock) {
        this.lock = 0;
        this.timeout = setTimeout(() => {
          this.lock = 1;
          this.ScrollTop(
            this.height * this.page + 5,
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
      if (this.page == this.maxpage)
        this.ScrollTop(
          this.height * this.page + 5,
          Math.abs(this.oldpage - this.page) >= 1
            ? Math.abs(this.oldpage - this.page) * 200
            : 200,
          this.disabledoublelock
        );
      else
        this.ScrollTop(
          this.height * this.page,
          Math.abs(this.oldpage - this.page) >= 1
            ? Math.abs(this.oldpage - this.page) * 200
            : 200,
          this.disabledoublelock
        );
      this.disabledoublelock = 0;
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

  deactivated() {
    this.oldpos = this.$refs.scs.wrap$.scrollTop;
    console.log(this.oldpos);
    console.log(2);
  },
  activated() {
    console.log(this.oldpos);
    setTimeout(() => {
      this.$refs.scs.wrap$.scrollTop = this.oldpos;
    }, 20);

    console.log(1);
  },
};
</script>

<style>
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
