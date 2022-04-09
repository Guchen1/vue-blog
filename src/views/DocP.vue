<template>
  <div :style="{ 'min-height': height }">
    <transition name="el-fade-in">
      <loading-page v-if="loading"></loading-page>
    </transition>
    <transition name="el-fade-in">
      <doc-main
        v-if="!ready"
        v-show="!loading"
        :ready="ready"
        @loaded="load"
        :height="height"
      ></doc-main>
    </transition>
    <transition name="el-fade-in">
      <post-show
        @loaded="load"
        v-show="ready && !loading"
        v-if="path != undefined"
        :loading="loading"
        :ready="ready"
        :height="height"
        :path="path"
      ></post-show>
    </transition>
  </div>
</template>

<script>
var _wr = function (type) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");
import LoadingPage from "../components/LoadingPage.vue";
import DocMain from "../components/DocMain.vue";
import PostShow from "../components/PostShow.vue";
export default {
  components: {
    PostShow,
    LoadingPage,
    DocMain,
  },
  data() {
    return {
      height: "",
      ready: false,
      path: this.$route.query.PassageId,
      loading: true,
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 160 + "px";
    },
    routepath() {
      console.log(this.$route.query.PassageId);
      this.path = this.$route.query.PassageId;
      var qlist = ["1", "qq"];
      if (
        qlist.find((element) => element == this.path) == undefined &&
        this.path != ''&&this.path != undefined
      ) {
        this.$router.push("/passagenotdound");
        return;
      }
      if (this.path != undefined&&this.path!='') {
        this.ready = true;
      }
    },
    load() {
      this.loading = false;
    },
  },
  watch: {
    $route() {
      this.loading = true;
      this.routepath();
    },
  },
  mounted() {
    this.getheight();
    this.routepath();
    window.addEventListener("resize", this.getheight);
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
  },
};
</script>

<style>
</style>