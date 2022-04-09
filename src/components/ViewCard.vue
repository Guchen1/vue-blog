<template>
  <div>
    <router-link
      :to="{ name: 'doc', query: { PassageId: id } }"
      style="text-decoration: none"
    >
      <el-card shadow="hover" class="box-card" style='margin-bottom:10px'>
        <template #header>
          <div class="card-header">
            <span>{{ title }}</span>
          </div>
        </template>
        <div class="word">
          {{ content }}
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
</style>