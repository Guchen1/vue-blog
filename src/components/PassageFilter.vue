<template>
  <el-space wrap
    >
      <el-checkbox-group v-model="checkList" :style="{'margin-top': k==1? 0:'70px'}">
        <el-checkbox label="Option A" />
        <el-checkbox label="Option B" />
        <el-checkbox label="Option C" />
      </el-checkbox-group>
    
    </el-space>
    <div >
      <span class="demonstration" style="left: 0">起始日期</span><br/>
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day" :style="{'min-width': k==1? 0:'80%'}"/>
    </div>
    <div>
      <span class="demonstration">结束日期</span><br/>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :style="{'min-width': k==1? 0:'80%'}"
      /></div
  >
  <el-space style="padding-top: 10px">
    <el-button @click="emit">确定</el-button><el-button @click="reset">重置</el-button>
  </el-space>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      checkList: [],
    };
  },
  props: ['k','v1','v2','cl'],
  mounted() {
    this.value1 = this.v1;
    this.value2 = this.v2;
    this.checkList = this.cl;
  },
  emits: ['emit'],
  methods: {
    emit() {
      this.$emit('emit', this.value1, this.value2, this.checkList);
    },
    reset(){
      this.value1 = "";
      this.value2 = "";
      this.checkList = [];
      this.$emit('emit', this.value1, this.value2, this.checkList);
    }
  },
};
</script>

<style>
</style>