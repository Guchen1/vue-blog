<template>
  <div
    :style="{ 'min-height': height - 80 + 'px' }"
    style="display: flex; justify-content: center; align-items: center"
  >
    <el-card
      style="min-width: 300px"
      :style="{ 'padding-bottom': width < 660 ? '0' : '20px' }"
    >
      <h1 style="margin-top: 0px">登录</h1>

      <el-form label-width="70px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" style="width: 100%" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" style="width: 100%" />
        </el-form-item>
        <el-form-item>
          <el-button text type="primary" @click="login()">登录</el-button>
          <el-button text @click="$router.push('/')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .get(
          this.$server +
            "/admin/login?username=" +
            this.username +
            "&password=" +
            this.password
        )
        .then((res) => {
          if (res.data.status == "success") {
            console.log(res);
            this.$message.success({ duration: 1000, message: "登录成功" });
            this.$emit("login");
            this.$router.push("/");
            this.username = "";
            this.password = "";
            //this.$cookies.set("mysession",res.cookies)
          } else {
            this.$message.error({ duration: 1000, message: "用户名或密码错误" });
          }
        });
    },
  },
  activated() {
    //this.$router.push({
    //path: "/back",
    //});
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.logged) {
        vm.$message.warning({
          message: "已登录",
          duration: 1000,
        });
        vm.$router.push("/");
      }
    });
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    logged: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped>
.el-main {
  padding-bottom: 0px;
}
</style>
