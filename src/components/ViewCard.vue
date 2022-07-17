<template>
  <div>
    <router-link
      :to="{ name: 'doc', query: { PassageId: id } }"
      style="text-decoration: none"
    >
      <el-card shadow="hover" class="box-card" style="margin-bottom: 10px">
        <el-skeleton style="width: 100%" animated :loading="!loaded">
          <template #template>
            <el-skeleton-item variant="image" class="img" />
          </template>
          <template #default>
            <el-image :src="img.src" class="img" fit="cover" />
          </template>
        </el-skeleton>
        <el-skeleton style="width: 100%" animated :loading="!load">
          <template #template>
            <el-skeleton :rows="2" />
          </template>
          <template #default>
            <div class="content">
              <h3 class="title">{{ title }}</h3>
              <p class="description">{{ summary }}</p>
              <el-space>
                <el-icon :size="15">
                  <calendar />
                </el-icon>
                <div class="time">{{ time }}</div>
                <div
                  :style="{ width: mwidth - 323 + 'px' }"
                  v-if="width >= 426 ? 1 : 0"
                ></div>
                <el-icon v-if="width >= 426 ? 1 : 0" :size="15">
                  <View />
                </el-icon>
                <el-rate
                  v-if="width >= 426 ? 1 : 0"
                  style=""
                  v-model="va1"
                  disabled
                  text-color="#ff9900"
                  score-template="{value} points"
                />
              </el-space>
            </div>
          </template>
        </el-skeleton>
      </el-card>
    </router-link>
  </div>
</template>

<script>
import { Calendar } from "@element-plus/icons-vue";
import { View } from "@element-plus/icons-vue";
export default {
  components: {
    Calendar,
    View,
  },
  data() {
    return {
      img: new Image(),
      loaded: false,
      va1: 5,
    };
  },
  methods: {},
  created() {
    this.img.src = "./img/p1.jpg";
    this.img.onload = () => {
      this.loaded = true;
    };
  },
  props: ["id", "title", "summary", "time", "load", "width", "mwidth"],
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
  text-align: left;
  font-size: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: gray;
  display: inline-block;
}
</style>
