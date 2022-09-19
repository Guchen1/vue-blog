<template>
  <div
    class="root"
    id="text404"
    :style="{ height: height - 80 + 'px', width: width + 'px' }"
    style="text-align: center; display: table-cell; vertical-align: middle"
  >
    404 Not Found <br />
    <div id="text4042">将在2秒后返回主页</div>
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: document.body.clientWidth - 40,
      time: setTimeout(() => {
        this.$router.push("/");
      }, 2000),
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    //s() {},
    // eslint-disable-next-line

    getwidth() {
      this.width = document.body.clientWidth - 40;
    },
  },
  activated() {
    this.$emit("nomain");
    window.addEventListener("resize", this.getwidth, { passive: true });
  },

  deactivated() {
    window.removeEventListener("resize", this.getwidth);
    clearTimeout(this.time);
  },
};
</script>

<style>
@media screen and (max-width: 768px) {
  #text404 {
    font-size: 30px;
  }
  #text4042 {
    font-size: 15px;
  }
}
@media screen and (min-width: 768px) {
  #text404 {
    font-size: 40px;
  }
  #text4042 {
    font-size: 20px;
  }
  @media screen and (min-width: 1024px) {
    #text404 {
      font-size: 60px;
    }
    #text4042 {
      font-size: 30px;
    }
  }
}
.el-main {
  padding-bottom: 0px;
}
</style>
