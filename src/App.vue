<template>
  <div class="common-layout" style="height: 100%; overflow-y: hidden">
    <el-container style="height: 100%">
      <el-header style="padding: 0" v-if="!(this.$route.path.search('/back') != -1)">
        <div v-if="width < 450" style="height: 60px; display: flex">
          <el-button style="height: 60px; margin-left: 1em" text @click="drawer = true"
            ><div><MN style="height: 1.5em; width: 1.5em" /></div
          ></el-button>
          <div
            style="
              font-weight: bold;
              display: inline-flex;
              align-items: center;
              padding-left: 1.5em;
              line-height: 60px;
            "
          >
            Chen's blog
          </div>
          <el-drawer v-model="drawer" :with-header="false" direction="ltr" size="60%">
            <el-menu
              :ellipsis="false"
              :router="true"
              :default-active="$route.path"
              style="border-right: 0px"
            >
              <el-menu-item style="font-size: 15px" index="/">主页</el-menu-item>
              <el-menu-item style="font-size: 15px" index="/doc">文章</el-menu-item>
              <el-menu-item style="font-size: 15px" index="/link">友链</el-menu-item>
              <el-menu-item style="font-size: 15px" @click="drawer = false" index="/login"
                >登录</el-menu-item
              >
            </el-menu>
          </el-drawer>
        </div>

        <el-menu
          v-else
          class="center1"
          mode="horizontal"
          :ellipsis="false"
          :router="true"
          :default-active="$route.path"
          :style="{
            'padding-left': '10%',
            'padding-right': '10%',
          }"
        >
          <div style="font-weight: bold">My Blog</div>
          <div style="flex-grow: 1"></div>
          <el-menu-item style="font-size: 15px" index="/">主页</el-menu-item>
          <el-menu-item style="font-size: 15px" index="/doc">文章</el-menu-item>
          <el-menu-item style="font-size: 15px" index="/link">友链</el-menu-item>
          <el-menu-item style="font-size: 15px" index="/login">登录</el-menu-item>
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
                      :isDark="Dark"
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
    <OnClickOutside @trigger="CheckIsClosed()">
      <el-popover placement="top" :width="150" v-model:visible="popvisible">
        <template #reference>
          <el-button
            text
            circle
            type="primary"
            @click="popvisible = !popvisible"
            style="
              text-align: center;
              position: fixed;
              bottom: 70px;
              z-index: 100000;
              right: 30px;
              width: 45px;
              height: 45px;
            "
            ><Brush style="height: 20px; width: 20px" /></el-button
        ></template>
        <div style="display: flex; justify-content: center; align-items: center">
          <span>选择主题色</span>
          <el-color-picker v-model="color" /></div></el-popover
    ></OnClickOutside>
    <UseDark v-slot="{ isDark, toggleDark }">
      <el-button
        text
        @click="
          toggleDark();
          Dark = !Dark;
        "
        type="primary"
        circle
        style="
          text-align: center;
          position: fixed;
          bottom: 20px;
          z-index: 100000;
          right: 30px;
          width: 45px;
          height: 45px;
        "
        ><Sunny v-if="!isDark" style="height: 20px; width: 20px" />
        <Moon v-else style="height: 20px; width: 20px"
      /></el-button>
    </UseDark>
  </div>
</template>

<script>
import { ref } from "vue";
import { UseDark, OnClickOutside } from "@vueuse/components";
import LoadingPage from "./components/LoadingPage.vue";
import { Menu as MN, Moon, Sunny, Brush } from "@element-plus/icons-vue";
import { useCssVar } from "@vueuse/core";
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
  components: { LoadingPage, MN, UseDark, Moon, Sunny, Brush, OnClickOutside },
  name: "App",
  data() {
    return {
      path: window.location.href,
      height: document.body.clientHeight - 140,
      IsMain: 0,
      IsBack: 0,
      width: 0,
      drawer: false,
      Dark: false,
      el: ref(null),
      cssVar: useCssVar("--el-color-primary", this.el),
      color: "#409eff",
      popvisible: false,
      out: 0,
    };
  },
  methods: {
    CheckIsClosed() {
      setTimeout(() => {
        let a = document.getElementsByClassName("el-color-picker__panel")[0];
        if (a.attributes["aria-hidden"].value == "true") {
          this.popvisible = false;
        }
      }, 100);
    },
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
    color() {
      this.cssVar = this.color;
    },
    $route() {
      this.checkIsMain();
    },
  },
  async created() {
    this.$store.commit("push", {
      mainimg: ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/p1.jpg"],
      links: [
        {
          name: "Chen",
          details: "Chen is a web developer",
          img: "/img/my.bmp",
          state: 1,
          sort: 2,
          tmpsort: 2,
          link: "https://www.chen.com",
        },
        {
          name: "Chen3",
          details: "Chen is a web developer",
          img: "/img/my.bmp",
          state: 1,
          sort: 3,
          tmpsort: 3,
          link: "https://www.chen.com",
        },
        {
          template: "<el-card ></el-card>",
          js: "",
          css: "",
          name: "Chen",
          variables: "",
          parsed: null,
          state: 2,
          sort: 1,
          tmpsort: 1,
          link: "https://www.chen.com",
        },
      ],
    });
  },
  mounted() {
    document.querySelector("html").className != "dark"
      ? (this.Dark = false)
      : (this.Dark = true);
    if (this.$route.path == "/" || this.$route.path.search("/back") != -1) {
      this.IsMain = 1;
      this.IsBack = 1;
    } else {
      this.IsMain = 0;
      this.IsBack = 0;
    }

    this.getheight();
    window.addEventListener("resize", this.getheight, { passive: true });
  },

  unmounted() {
    window.removeEventListener("resize", this.getheight, { passive: true });
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
