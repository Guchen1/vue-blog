<template>
  <div
    class="root"
    id="text404"
    :style="{ height: height + 'px', width: width + 'px' }"
    style="text-align: center; display: table-cell; vertical-align: middle"
  >
    Loading...
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
      width: document.body.clientWidth - 40,
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 200;
    },
    getwidth() {
      this.width = document.body.clientWidth - 40;
    },
  },
  activated() {
    this.getheight();
    window.addEventListener("resize", this.getheight, { passive: true });
    window.addEventListener("resize", this.getwidth, { passive: true });
  },

  deactivated() {
    window.removeEventListener("resize", this.getheight);
    window.removeEventListener("resize", this.getwidth);
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
} ;
</style>
