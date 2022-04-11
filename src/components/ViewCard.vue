<template>
  <div>
    <router-link
      :to="{ name: 'doc', query: { PassageId: id } }"
      style="text-decoration: none"
    >
      <el-card shadow="hover" class="box-card" style="margin-bottom: 10px">
        <el-skeleton style="width: 100%" animated :loading='!loaded'>
          <template #template>
            <el-skeleton-item variant="image"  class="img" />
          </template>
          <template #default>
            <img  src="../assets/p1.jpg" class="img" />
          </template>
        </el-skeleton>

        <div class="content">
          <h3 class="title">{{ title }}</h3>
          <p class="description">{{ content }}</p>
          <div>
            <el-icon :size="15">
              <calendar />
            </el-icon>
            <div class="time">{{ time }}</div>
          </div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
import { Calendar } from "@element-plus/icons-vue";
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      img:new Image(),
      loaded: false,
    };
  },
  methods: {

  },
  created() {
    this.img.src = require("../assets/p1.jpg");
    this.img.onload = () => {
          this.loaded = true;
        }
  },
  props: ["id", "title", "content", "time"],
};
</script>

<style>
.word {
  word-wrap: break-word;
  word-break: break-all;
}
.img {
  background-size: cover;
  width: 100%;
  height: 150px;
}
.time {
  text-align: right;
  font-size: 8px;
  color: gray;
  float: right;
}
</style>