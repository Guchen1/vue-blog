<template>
  <el-container
    style="width: 100%; overflow-y: hidden"
    :style="{ height: height + 60 + 'px' }"
  >
    <el-menu
      :collapse="width < 678"
      :router="true"
      :default-active="$route.path"
      style="height: 100%; min-width: 63px"
    >
      <el-menu-item class="p" index="/" style="margin-top: 6px"
        ><el-icon><Back /></el-icon
        ><template #title><span class="p">返回主页</span></template></el-menu-item
      >
      <hr style="margin-top: 9px" />
      <el-menu-item class="p" index="/back"
        ><el-icon><Grid /></el-icon
        ><template #title><span class="p">总览</span></template></el-menu-item
      ><el-menu-item index="/back/mainset"
        ><el-icon><Folder /></el-icon
        ><template #title><span class="p">主页设置</span></template></el-menu-item
      >
      <el-menu-item class="p" index="/back/passageset"
        ><el-icon><EditPen /></el-icon
        ><template #title><span class="p">文章管理</span></template></el-menu-item
      >
      <el-menu-item class="p" index="/back/friendset"
        ><el-icon><User /></el-icon
        ><template #title><span class="p">友链设置</span></template></el-menu-item
      >
      <el-menu-item class="p" index="/back/etcset"
        ><el-icon><Paperclip /></el-icon
        ><template #title><span class="p">杂项</span></template></el-menu-item
      >
    </el-menu>
    <el-main class="m">
      <el-scrollbar :max-height="height + 60 + 'px'">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition name="el-fade-in-linear" mode="out-in">
              <component
                @changeq="$emit('changeq')"
                :height="height"
                :key="$route.name"
                :is="Component"
                :width="width"
              ></component>
            </Transition>
          </template>
        </RouterView>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import CEditor from "../components/CEditor.vue";
import { EditPen, Grid, User, Paperclip, Folder, Back } from "@element-plus/icons-vue";
export default {
  name: "BackPage",
  components: {
    // eslint-disable-next-line
    CEditor,
    EditPen,
    Grid,
    User,
    Paperclip,
    Folder,
    Back,
  },

  props: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 1000,
    },
    logged: {
      type: Boolean,
      default: false,
    },
  },
  deactivated() {
    const q = document.getElementsByClassName("el-popper");
    setTimeout(() => {
      if (q.length > 0) {
        for (const element of q) {
          element.setAttribute("aria-hidden", "true");
          element.style.display = "none";
        }
      }
    }, 10);
  },
  activated() {
    this.$emit("back");
  },
  mounted() {
    if (!this.logged) {
      this.$message.error({
        message: "请先登录",
        duration: 1000,
      });
      this.$router.push("/login");
    }
    this.$notify({
      title: "提示",
      message: "欢迎来到后台管理界面",
      type: "success",
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("changeq");
    next();
  },
  data() {
    return {};
  },
};
</script>
<style>
.m {
  flex-wrap: wrap;
  overflow-x: hidden;
}
.p {
  text-align: center;
  width: 100%;
}
.ck {
}
</style>
