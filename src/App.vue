<template>
  <div class="common-layout" style="height: 100%; overflow-y: hidden">
    <el-container style="height: 100%">
      <el-header style="padding: 0" v-if="!IsBack">
        <div v-if="width < 500" style="height: 60px; display: flex">
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
              <el-menu-item
                style="font-size: 15px"
                @click="drawer = false"
                :index="logged ? '/back' : '/login'"
                >{{ logged ? "编辑" : "登录" }}</el-menu-item
              >
              <el-button
                text
                style="font-size: 10px; margin-left: 5px"
                @click="logout"
                v-if="logged"
                >注销</el-button
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
          style="align-items: center"
          :style="{
            'padding-left': '10%',
            'padding-right': logged ? '0' : '10%',
          }"
        >
          <div style="font-weight: bold">My Blog</div>
          <div style="flex-grow: 1"></div>
          <el-menu-item style="font-size: 15px" index="/">主页</el-menu-item>
          <el-menu-item style="font-size: 15px" index="/doc">文章</el-menu-item>
          <el-menu-item style="font-size: 15px" index="/link">友链</el-menu-item>
          <el-menu-item style="font-size: 15px" :index="logged ? '/back' : '/login'">{{
            logged ? "编辑" : "登录"
          }}</el-menu-item>
          <el-button
            text
            style="font-size: 10px; margin-left: 5%; margin-right: 2em"
            v-if="logged"
            @click="logout"
            >注销</el-button
          >
        </el-menu>
      </el-header>
      <el-container>
        <el-main
          :style="{ padding: IsMain || IsBack ? '0px' : '20px' }"
          style="padding-bottom: 0px"
        >
          <el-scrollbar
            ref="sc"
            :max-height="
              IsMain ? height + 80 + 'px' : IsBack ? height + 140 + 'px' : height + 'px'
            "
            width="100%"
          >
            <RouterView v-slot="{ Component }">
              <template v-if="Component">
                <Transition name="el-fade-in-linear" mode="out-in">
                  <KeepAlive :key="11" exclude="PostShow">
                    <component
                      @changeq="change()"
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
        <el-footer v-if="!(IsMain || IsBack)"
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
            @click="popvisible = true"
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
          <el-color-picker
            v-model="color"
            :predefine="['#409eff']"
            :show-alpha="true"
            color-format="hex"
          /></div></el-popover
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
      logged: false,
    };
  },
  methods: {
    logout() {
      this.$axios.get(this.$server + "/logout").then(() => {
        this.logged = false;
        this.$message.success("注销成功");
      });
    },
    change() {
      this.IsBack = 1;
      setTimeout(() => {
        this.IsBack = 0;
      }, 200);
    },
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
        if (this.$route.path == "/") {
          this.IsMain = 1;
        } else {
          this.IsMain = 0;
        }
        if (this.$route.path.search("/back") != -1) {
          this.IsBack = 1;
        } else {
          this.IsBack = 0;
        }
      }, 250);
    },
  },
  watch: {
    color() {
      this.cssVar = this.color;
      this.$cookies.set("color", this.color, 60 * 60 * 24 * 30);
    },
    $route() {
      this.checkIsMain();
      if (this.$route.path == "/back" && !this.logged) {
        this.$axios.get(this.$server + "/login").then((res) => {
          if (res.data.status == "success") {
            this.logged = true;
          } else {
            this.logged = false;
          }
        });
      }
    },
  },
  async created() {
    if (this.$cookies.get("color") == null) {
      this.$cookies.set("color", this.color, 60 * 60 * 24 * 30);
    } else {
      this.color = this.$cookies.get("color");
    }
    this.$store.commit("push", {
      mainimg: ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/p1.jpg"],
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
    if (this.$route.path == "/") {
      this.IsMain = 1;
    } else {
      this.IsMain = 0;
    }
    if (this.$route.path.search("/back") != -1) {
      this.IsBack = 1;
    } else {
      this.IsBack = 0;
    }
    this.$axios.get(this.$server + "/login").then((res) => {
      if (res.data.status == "success") {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
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
