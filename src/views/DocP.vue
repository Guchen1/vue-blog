<template>
  <div :style="{ 'min-height': height + 'px' }">
    <transition v-if="!ready" name="scale">
      <Suspense >
        <template #fallback>
          <loading-page></loading-page>
        </template>
        <template #default>
          <doc-main :ready="ready" :height="height"></doc-main>
        </template>
      </Suspense>
    </transition>
    <transition v-if="ready"  name="scale">
      <Suspense >
        <template #fallback>
          <loading-page></loading-page>
        </template>
        <template #default>
          <post-show
            :loading="loading"
            :ready="ready"
            :height="height"
            :path="path"
          ></post-show>
        </template>
      </Suspense>
    </transition>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
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
const PostShow = defineAsyncComponent(() =>
  import("../components/PostShow.vue")
);
const DocMain = defineAsyncComponent(() => import("../components/DocMain.vue"));
export default {
  components: {
    PostShow,
    DocMain,
    LoadingPage,
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
      this.height = document.body.clientHeight - 160;
    },
    routepath() {
      console.log(this.$route.query.PassageId);
      this.path = this.$route.query.PassageId;
      var qlist = ["1", "qq"];
      if (
        qlist.find((element) => element == this.path) == undefined &&
        this.path != "" &&
        this.path != undefined
      ) {
        this.$router.push("/passagenotdound");
        return;
      }
      if (this.path != undefined && this.path != "") {
        this.ready = true;
      }
    },
    load() {
      this.loading = false;
    },
  },
  watch: {
    $route() {
      this.ready = false;
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
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>