<template>
  <div :style="{ 'min-height': height }">
    <div v-if="!ready">2</div>
    <post-show
      v-if="ready"
      :ready="ready"
      :height="height"
      :path="path"
    ></post-show>
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
import PostShow from "../components/PostShow.vue";
export default {
  components: {
    PostShow,
  },
  data() {
    return {
      height: "",
      ready: false,
      path: this.$route.query.PassageId,
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 160 + "px";
    },
    routepath() {
      this.path = this.$route.query.PassageId;
      var qlist = ["1", "qq"];
      if (qlist.find((element) => element == this.path) == undefined) {
        this.$router.push("/passagenotdound");
        return;
      }
      if (this.path != undefined) {
        this.ready = true;
      }
    },
  },
  mounted() {
    this.getheight();
    this.routepath();
    window.addEventListener("resize", this.getheight);
    window.addEventListener("pushstate", this.routepath);
    window.addEventListener("popstate", this.routepath);
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
    window.removeEventListener("pushstate", this.routepath);
    window.removeEventListener("popstate", this.routepath);
  },
};
</script>

<style>
</style>