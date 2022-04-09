<template>
  <div>
    <router-link
      :to="{ name: 'doc', query: { PassageId: id } }"
      style="text-decoration: none"
    >
      <el-card shadow="hover" class="box-card" style='margin-bottom:10px'>
        <img 
          src="../assets/p1.jpg"
          class="img"
        />
        <div class="content">
          <h3 class="title">{{ title }}</h3>
          <p class="description">{{ content }}</p>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "content"],
};
</script>

<style>
.word {
  word-wrap: break-word;
  word-break: break-all;
}
.img{
  background-size:cover;
  width:100%;
  max-height: 150px;
}
</style>