<template>
  <div
    class="root"
    id="text404"
    :style="{ height: height + 'px', width: width + 'px' }"
    style="text-align: center; display: table-cell; vertical-align: middle"
  >
    404 Not Found <br />
    <div id="text4042">将在3秒后返回主页</div>
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
      width: document.body.clientWidth - 40,
      time: setTimeout(() => {
        this.$router.push("/");
      }, 3000),
    };
  },
  methods: {
    //s() {},
    getheight() {
      this.height = document.body.clientHeight - 140;
    },
    getwidth() {
      this.width = document.body.clientWidth - 40;
    },
  },
  mounted() {
    this.getheight();
    window.addEventListener("resize", this.getheight);
    window.addEventListener("resize", this.getwidth);
  },

  unmounted() {
    window.removeEventListener("resize", this.getheight);
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
