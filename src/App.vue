<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0">
        <el-row class="center">
          <el-col :md="2" :xs="1" :sm='2' class="header"></el-col>
          <el-col :md="2" :xs="6" :sm="3" class="header"
            ><div class="" style="font-weight: bold">My Blog</div></el-col
          ><el-col :md="10" :xs="4" :sm="9" class="header"></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm='2'
            class="header"
            :class="{ active: path == '/' }"
            ref="to"
            @click="hashc"
            ><router-link class="el-link gu" style="font-size: 16px" to="/"
              >主页</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm='2'
            class="header"
            ref="todoc"
            :class="{ active: path == '/doc' }"
            @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/doc"
              >文章</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm='2'
            class="header"
            ref="tosetting"
            :class="{ active: path == '/setting' }"
            @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/setting"
              >设置</router-link
            ></el-col
          ><el-col
            :md="2"
            :xs="3"
            :sm='2'
            class="header"
            ref="tologin"
            :class="{ active: path == '/login' }"
            @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/login"
              >登录</router-link
            ></el-col
          ><el-col :md="2" :xs="1" :sm='2' class="header"></el-col></el-row
      ></el-header>
      <el-container>
        <el-main>
          <el-scrollbar :max-height="height">
            <router-view v-slot="{ Component }">
              <transition name="scale">
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
export default {
  components: {},
  name: "App",
  data() {
    return {
      path: window.location.href,
      height: document.body.clientHeight - 160 + "px",
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 160 + "px";
    },
    hashc() {
      setTimeout(() => {
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
        if (this.path == "") {
          this.path = "/";
        }
      }, 100);
    },
  },
  mounted() {
    this.getheight();
    this.hashc();
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
  border-bottom: 1px solid var(--el-border-color);

  text-align: center;
}
.text {
}
.center {
  line-height: 60px;
  font-size: 16px !important;
}
.gu {
  color: black !important;
  bottom: 3px;
}
.active {
  border-bottom: 2px solid var(--el-color-primary);
}
</style>
