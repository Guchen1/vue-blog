<template>
  <div :style="{ 'min-height': height + 'px' }">
    <transition-group name="el-fade-in-linear" tag="w">
          <Suspense v-if="!ready">
            <template #fallback>
              <transition name="el-fade-in-linear">
              <loading-page></loading-page>
              </transition>
            </template>     
              <doc-main :ready="ready" :height="height"></doc-main>
          </Suspense>
          <Suspense v-if="ready">
            <template #fallback>
              <transition name="el-fade-in-linear">
              <loading-page></loading-page>
              </transition>
            </template>
              <post-show
                :loading="loading"
                :ready="ready"
                :height="height"
                :path="path"
              ></post-show>
          </Suspense>
    </transition-group>
  </div>
</template>

<script>
import LoadingPage from "../components/LoadingPage.vue";
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
      this.height = document.body.clientHeight - 140;
    },
    async routepath() {
        await this.$axios.get("http://124.223.53.17:8080/").then((res) => {
        this.qlist=res.data;
});
      this.path = this.$route.query.PassageId;
      if (
        this.qlist.find((element) => element == this.path) == undefined &&
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
  async mounted() {
    this.getheight();
    await this.routepath();
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
  transform: scale(0.6);
}
.el-main{
  padding-bottom: 0px;
}
</style>