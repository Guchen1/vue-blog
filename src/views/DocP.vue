<template>
  <div :style="{ 'min-height': height - 80 + 'px' }">
    <transition name="el-fade-in-linear" mode="out-in">
      <doc-main v-if="!ready" :ready="ready" :key="1" :height="height - 80"></doc-main>
    </transition>
    <transition name="el-fade-in-linear" mode="out-in">
      <post-show
        v-if="ready"
        :key="2"
        :ready="ready"
        :height="height - 80"
        :path="path"
      ></post-show>
    </transition>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
let _wr = function (type) {
  let orig = history[type];
  return function () {
    let rv = orig.apply(this, arguments);
    let e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");
const PostShow = defineAsyncComponent(() => import("../components/PostShow.vue"));
const DocMain = defineAsyncComponent(() => import("../components/DocMain.vue"));
export default {
  components: {
    PostShow,
    DocMain,
  },
  data() {
    return {
      ready: false,
      path: this.$route.query.PassageId,
      loading: false,
      qlist: undefined,
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    async routepath() {
      this.path = this.$route.query.PassageId;
      if (this.$route.path == "/doc") {
        if (this.path != undefined && this.path != "") {
          this.ready = true;
        } else this.ready = false;
      }
      if (this.qlist == undefined) {
        await this.$axios.get(this.$server + "/passages").then((res) => {
          this.qlist = res.data;
          if (
            this.qlist.find((element) => element == this.path) == undefined &&
            this.path != "" &&
            this.path != undefined
          ) {
            this.$router.push("/passagenotdound");
          }
        });
      } else if (
        this.qlist.find((element) => element == this.path) == undefined &&
        this.path != "" &&
        this.path != undefined
      ) {
        this.$router.push("/passagenotdound");
      }
    },
    load() {
      this.loading = false;
    },
  },
  watch: {
    async $route() {
      this.loading = true;
      await this.routepath();
    },
  },
  async mounted() {
    await this.routepath();
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

.el-main {
  padding-bottom: 0px;
}
</style>
