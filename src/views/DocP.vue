<template>
  <div :style="{ 'min-height': height - 80 + 'px' }">
    <transition name="el-fade-in-linear" mode="out-in">
      <keep-alive exclude="PostShow">
        <doc-main
          v-if="$route.name == 'doc'"
          :ready="ready"
          :key="1"
          :height="height - 80"
        ></doc-main>

        <post-show
          :isDark="isDark"
          v-else
          :key="2"
          :ready="ready"
          :height="height - 80"
        ></post-show>
      </keep-alive>
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
      loading: false,
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  watch: {},
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
