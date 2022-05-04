<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0">
        <el-row class="center">
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
            ><router-link class="el-link gu" style="font-size: 16px;width:100%" to="/" 
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
              style="font-size: 16px;width:100%"
              :to="{ name: 'doc', query: { } }"
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
              style="font-size: 16px;width:100%"
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
              style="font-size: 16px;width:100%"
              to="/login"
              >登录</router-link
            ></el-col
          ><el-col :md="2" :xs="1" :sm="2" class="header"></el-col></el-row
      ></el-header>
      <el-container>
        <el-main>
          <el-scrollbar :max-height="height">
            <router-view v-slot="{ Component }">
              <transition name="el-fade-in-linear">
                <component :is="Component" />
              </transition> </router-view
          ></el-scrollbar>
        </el-main>
        <el-footer
          ><div class="center" style="text-align: center">
            Copyright © 2022
          </div></el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>

<script>
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
  components: {},
  name: "App",
  data() {
    return {
      path: window.location.href,
      height: document.body.clientHeight - 140 +'px',
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 140+'px' ;
    },
    hashc() {
      this.path = window.location.href;
      this.path = this.path
        .substring(7)
        .substring(this.path.substring(7).search("/"));
      if (this.path.substring(1).search("/") != -1) {
        this.path = this.path.substring(
          0,
          this.path.substring(1).search("/") + 1
        );
      }
      if (this.path.search("\\?") != -1) {
        this.path = this.path.substring(0, this.path.search("\\?"));
      }
      if (this.path == "") {
        this.path = "/";
      }
    },
  },
  watch: {
    $route() {
      this.hashc();
    },
  },
  mounted() {
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
  height:60px;
  text-align: center;
}
.text {
}
.center {
  line-height: 60px;
  height:60px;
  font-size: 16px !important;
}
.gu {
  color: black !important;
  bottom: 3px;
}
.active {
  border-bottom: 3px solid var(--el-color-primary);
}
.el-main{
  padding-bottom: 0px;
}
</style>
