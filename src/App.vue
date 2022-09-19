<template>
  <div class="common-layout" style="height: 100%; overflow-y: hidden">
    <el-container style="height: 100%">
      <el-header style="padding: 0" v-if="!IsBack">
        <Transition name="el-fade-in-linear" mode="out-in">
          <div v-if="width < 660" style="height: 60px; display: flex">
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
                <el-menu-item @click="drawer = false" style="font-size: 15px" index="/"
                  >主页</el-menu-item
                >
                <el-menu-item @click="drawer = false" style="font-size: 15px" index="/doc"
                  >文章</el-menu-item
                >
                <el-menu-item
                  @click="drawer = false"
                  style="font-size: 15px"
                  index="/link"
                  >友链</el-menu-item
                >
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
              'padding-right': '0',
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
            <div style="font-size: 10px; width: 10%">
              <el-button text v-if="logged" @click="logout">注销</el-button>
            </div>
          </el-menu>
        </Transition>
      </el-header>
      <el-main
        :style="{
          padding: IsMain || IsBack ? '0px' : '20px',
          'padding-top': IsMain || IsBack ? '0px' : width <= 600 ? '10px' : '20px',
        }"
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
                <KeepAlive :key="11" exclude="PostShow,BackPage">
                  <component
                    @main="IsMain = true"
                    @login="login()"
                    :logged="logged"
                    @back="IsBack = true"
                    @changeq="change()"
                    :height="height + 80"
                    :is="Component"
                    :width="width"
                    :isDark="Dark"
                    @nomain="IsMain = false"
                    :key="$route.path.search('/back') != -1 ? '/back' : $route.path"
                  ></component>
                </KeepAlive>
              </Transition>
            </template> </RouterView
        ></el-scrollbar>
      </el-main>
      <el-footer v-if="!(IsMain || IsBack)"
        ><div class="center1" style="text-align: center; line-height: 60px">
          Copyright © 2022
          <a
            href="https://beian.miit.gov.cn/"
            style="text-decoration: none; font-size: 12px"
            :style="{ color: Dark ? '#fff' : '#000' }"
            >苏ICP备2022031828号-1</a
          >
        </div>
      </el-footer>
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
              right: 20px;
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
          right: 20px;
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
      IsMain: false,
      IsBack: false,
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
    login() {
      this.logged = true;
    },
    logout() {
      this.$axios.get(this.$server + "/admin/logout").then(() => {
        this.logged = false;
        this.$message.success({ duration: 1000, message: "注销成功" });
      });
    },
    change() {
      setTimeout(() => {
        this.IsBack = false;
      }, 250);
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
      this.height = window.innerHeight - 140;
      this.width = window.innerWidth;
      setTimeout(() => {
        clearInterval(a);
      }, 400);
      let a = setInterval(() => {
        this.$refs.sc.update();
      }, 100);
    },
  },
  watch: {
    color() {
      this.cssVar = this.color;
      this.$cookies.set("color", this.color, 60 * 60 * 24 * 30);
    },
  },
  async created() {
    this.width = window.innerWidth;
    if (this.$cookies.get("color") == null) {
      this.$cookies.set("color", this.color, 60 * 60 * 24 * 30);
    } else {
      this.color = this.$cookies.get("color");
    }
    this.$store.dispatch("initial", [this.$axios, this.$server]);
    this.$store.commit("push", {
      mainimg: ["/img/1.webp", "/img/2.webp", "/img/3.webp", "/img/p1.webp"],
    });
  },
  mounted() {
    document.querySelector("html").className != "dark"
      ? (this.Dark = false)
      : (this.Dark = true);

    this.$axios.get(this.$server + "/admin/login").then((res) => {
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
