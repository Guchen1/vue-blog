<template>
  <div
    :style="{ 'min-height': height - 80 + 'px' }"
    style="display: flex; justify-content: center; align-items: center"
  >
    <el-card style="min-width: 300px">
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
          this.$server + "/login?username=" + this.username + "&password=" + this.password
        )
        .then((res) => {
          if (res.data.status == "success") {
            console.log(res);
            this.$message.success("登录成功");
            this.$router.push("/back");
            //this.$cookies.set("mysession",res.cookies)
          } else {
            this.$message.error("用户名或密码错误");
          }
        });
    },
  },
  activated() {
    //this.$router.push({
    //path: "/back",
    //});
  },
  props: {
    height: {
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
