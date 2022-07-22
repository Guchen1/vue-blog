<template>
  <div class="common-layout" style="height: 100%; overflow-y: hidden">
    <el-container style="height: 100%">
      <el-header style="padding: 0" v-if="path != '/back'">
        <el-menu
          class="center1"
          mode="horizontal"
          :ellipsis="false"
          :router="true"
          :default-active="$route.path"
          :style="{
            'padding-left': width < 449 ? (width >= 365 ? '10px' : '0') : '10%',
            'padding-right': width < 449 ? '0' : '10%',
          }"
        >
          <div style="font-weight: bold" v-if="width >= 365">My Blog</div>
          <div style="flex-grow: 1" v-if="width >= 365"></div>
          <el-menu-item
            style="font-size: 15px"
            :class="width >= 365 ? '' : 'part'"
            index="/"
            >主页</el-menu-item
          >
          <el-menu-item
            style="font-size: 15px"
            :class="width >= 365 ? '' : 'part'"
            index="/doc"
            >文章</el-menu-item
          >
          <el-menu-item
            style="font-size: 15px"
            :class="width >= 365 ? '' : 'part'"
            index="/link"
            >友链</el-menu-item
          >
          <el-menu-item
            style="font-size: 15px"
            :class="width >= 365 ? '' : 'part'"
            index="/login"
            >登录</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-container>
        <el-main
          :style="{ padding: IsMain ? '0px' : '20px' }"
          style="padding-bottom: 0px"
        >
          <el-scrollbar
            ref="sc"
            :max-height="
              IsMain ? (IsBack ? height + 140 + 'px' : height + 80 + 'px') : height + 'px'
            "
            width="100%"
          >
            <RouterView v-slot="{ Component }">
              <template v-if="Component">
                <Transition name="el-fade-in-linear" mode="out-in">
                  <KeepAlive :key="11" exclude="PostShow">
                    <component
                      :height="height + 80"
                      :is="Component"
                      :width="width"
                      :key="$route.path.search('/back') != -1 ? '/back' : $route.path"
                    ></component>
                  </KeepAlive>
                </Transition>
              </template> </RouterView
          ></el-scrollbar>
        </el-main>
        <el-footer v-if="!IsMain"
          ><div class="center1" style="text-align: center">
            Copyright © 2022
          </div></el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoadingPage from "./components/LoadingPage.vue";

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
export default {
  components: { LoadingPage },
  name: "App",
  data() {
    return {
      path: window.location.href,
      height: document.body.clientHeight - 140,
      IsMain: 0,
      IsBack: 0,
      width: 0,
    };
  },
  methods: {
    getheight() {
      setTimeout(() => {
        this.height = document.body.clientHeight - 140;
        this.width = document.body.clientWidth;
      }, 10);

      setTimeout(() => {
        clearInterval(a);
      }, 400);
      let a = setInterval(() => {
        this.$refs.sc.update();
      }, 100);
    },
    hashc() {
      this.path = window.location.href;
      this.path = this.path.substring(7).substring(this.path.substring(7).search("/"));
      if (this.path.substring(1).search("/") != -1) {
        this.path = this.path.substring(0, this.path.substring(1).search("/") + 1);
      }
      if (this.path.search("\\?") != -1) {
        this.path = this.path.substring(0, this.path.search("\\?"));
      }
      if (this.path == "") {
        this.path = "/";
      }
    },
    checkIsMain() {
      setTimeout(() => {
        if (this.$route.path == "/" || this.$route.path.search("/back") != -1) {
          this.IsMain = 1;
          this.IsBack = 1;
        } else {
          this.IsMain = 0;
          this.IsBack = 0;
        }
      }, 250);
    },
  },
  watch: {
    $route() {
      this.checkIsMain();
      this.hashc();
    },
  },
  mounted() {
    if (this.$route.path == "/" || this.$route.path.search("/back") != -1) {
      this.IsMain = 1;
      this.IsBack = 1;
    } else {
      this.IsMain = 0;
      this.IsBack = 0;
    }
    this.hashc();
    this.getheight();
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
.scale-leave-active {
  display: none;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.header {
  border-bottom: 2px solid var(--el-border-color);
  height: 60px;
  text-align: center;
}

.center1 {
  line-height: 60px;
  height: 60px;
  font-size: 16px !important;
}
.gu {
  color: black !important;
  bottom: 3px;
}
.active {
  border-bottom: 3px solid var(--el-color-primary);
}
.el-main {
  padding-bottom: 0px;
}
.part {
  width: 25%;
}
</style>
