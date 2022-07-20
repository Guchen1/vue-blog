<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0" v-if="path != '/back'">
        <el-row class="center1">
          <el-col :md="2" :xs="1" :sm="2" class="header"></el-col>
          <el-col :md="2" :xs="6" :sm="3" class="header"
            ><div class="" style="font-weight: bold">My Blog</div></el-col
          ><el-col :md="10" :xs="4" :sm="9" class="header"></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm="2"
            class="header"
            :class="{ active: path == '/' }"
            ref="to"
            ><router-link class="el-link gu" style="font-size: 16px; width: 100%" to="/"
              >主页</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm="2"
            class="header"
            ref="todoc"
            :class="{ active: path == '/doc' }"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px; width: 100%"
              :to="{ name: 'doc', query: {} }"
              >文章</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm="2"
            class="header"
            ref="tosetting"
            :class="{ active: path == '/setting' }"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px; width: 100%"
              to="/setting"
              >设置</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm="2"
            class="header"
            ref="tologin"
            :class="{ active: path == '/login' }"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px; width: 100%"
              to="/login"
              >登录</router-link
            ></el-col
          ><el-col :md="2" :xs="1" :sm="2" class="header"></el-col></el-row
      ></el-header>
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
                  <KeepAlive exclude="PostShow">
                    <component
                      :height="height + 80"
                      :is="Component"
                      :key="$route.name"
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
//import { Edit } from '@element-plus/icons-vue'
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
export default {
  components: { LoadingPage },
  name: "App",
  data() {
    return {
      path: window.location.href,
      height: document.body.clientHeight - 140,
      IsMain: 0,
      IsBack: 0,
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 140;
      setTimeout(() => {
        clearInterval(a);
      }, 400);
      var a = setInterval(() => {
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
        if (this.$route.path == "/" || this.$route.path == "/back") {
          this.IsMain = 1;
          this.IsBack = 1;
        } else this.IsMain = 0;
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
    if (this.$route.path == "/") {
      this.IsMain = 1;
    } else this.IsMain = 0;
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

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

:root {
}
.header {
  border-bottom: 2px solid var(--el-border-color);
  height: 60px;
  text-align: center;
}
.text {
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
</style>
