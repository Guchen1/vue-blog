<template >
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0">
        <el-row class="center">
          <el-col :span="2" class="header"></el-col>
          <el-col :span="2" class="header"
            ><div class="" style="font-weight: bold">My Blog</div></el-col
          ><el-col :span="10" class="header"></el-col
          ><el-col :span="2" class="header" :class="{active:path=='/'}" ref="to" @click="hashc"
            ><router-link 
              class="el-link gu"
              style="font-size: 16px"
              to="/"
              
              >主页</router-link
            ></el-col
          ><el-col :span="2" class="header" ref='todoc' :class="{active:path=='/doc'}"  @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/doc"
               
              >文章</router-link
            ></el-col
          ><el-col :span="2" class="header" ref='tosetting' :class="{active:path=='/setting'}"  @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/setting"
              
              >设置</router-link
            ></el-col
          ><el-col :span="2" class="header" ref='tologin' :class="{active:path=='/login'}"  @click="hashc"
            ><router-link
              class="el-link gu --el-font-size-medium"
              style="font-size: 16px"
              to="/login"
              
              >登录</router-link
            ></el-col
          ><el-col :span="2" class="header"></el-col></el-row
      ></el-header>
      <el-container>
        <el-main>
          <el-scrollbar :max-height="height">
            <router-view></router-view
          ></el-scrollbar>
        </el-main>
        <el-footer
          ><div class="center" style="text-align: center">
            @copyright
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
      height: document.body.clientHeight - 120 + "px",
    };
  },
  methods: {
    getheight() {
      this.height = document.body.clientHeight - 120 + "px";
    },
    hashc(){
      this.path=window.location.href
      this.path = this.path
      .substring(7)
      .substring(this.path.substring(7).search("/"));
    if (this.path[this.path.length - 1] == "/") {
      this.path = this.path.substring(0, this.path.length - 1);
    }
    if(this.path==''){
      this.path='/'
    }
    }
  },
  mounted() {
    this.getheight();
    this.path = this.path
      .substring(7)
      .substring(this.path.substring(7).search("/"));
    if (this.path[this.path.length - 1] == "/") {
      this.path = this.path.substring(0, this.path.length - 1);
    }
    if(this.path==''){
      this.path='/'
    }
    window.addEventListener("resize", this.getheight);
    console.log(this.path)
  },
  unmounted() {
    window.removeEventListener("resize", this.getheight);
  },
};
</script>

<style>
:root {
}
.header {
  border-bottom: 1px solid var(--el-border-color);
  padding-top: 18.415px;
  padding-bottom: 18.415px;
  text-align: center
}
.text {
}
.center {
  align-content: center;
  align-self: center;
  margin-left: 0.5%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px !important;
}
.gu {
  color: black !important;
  bottom: 3px;
}
.active{border-color: var(--el-color-primary);}
</style>