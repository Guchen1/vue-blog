<template>
  <div>
    <h1 style="padding-left: 10px">
      友链设置
      <div style="display: inline-block; padding-left: 20px">
        <el-button @click="save" :disabled="lock">保存</el-button>
        <el-button @click="cancel" :disabled="lock">重置</el-button>
      </div>
    </h1>
    <el-table
      :data="tmplinks"
      :default-sort="{ prop: 'sort', order: 'ascending' }"
      style="width: 100%"
      :max-height="height + 60 - 63 + 'px'"
    >
      <el-table-column prop="sort" sortable label="序号">
        <template #default="scope">
          <div
            style="display: flex; align-items: center; width: 100%"
            @dblclick="locke(scope)"
          >
            <span v-if="IsEdit[0] != scope.$index || IsEdit[1] != scope.cellIndex">{{
              scope.row.sort
            }}</span>
            <el-input-number
              v-else
              size="small"
              value-on-clear="min"
              :min="1"
              :max="10000"
              v-model="tmplinks[link(scope.row.sort)].tmpsort"
              @keyup.enter="
                IsEdit = [-1, -1];
                lock = 0;
                tmplinks[link(scope.row.sort)].sort =
                  tmplinks[link(scope.row.sort)].tmpsort;
              "
            >
            </el-input-number></div
        ></template>
      </el-table-column>

      <el-table-column label="名称">
        <template #default="scope">
          <div
            style="display: flex; align-items: center; width: 100%"
            @dblclick="locke(scope)"
          >
            <span v-if="IsEdit[0] != scope.$index || IsEdit[1] != scope.cellIndex">{{
              scope.row.name
            }}</span>
            <el-input
              :minlength="1"
              v-else
              v-model="tmplinks[link(scope.row.sort)].name"
              @keyup.enter="
                tmplinks[link(scope.row.sort)].name = unlock(
                  tmplinks[link(scope.row.sort)].name
                )
              "
            ></el-input>
          </div> </template
      ></el-table-column>
      <el-table-column label="头像"
        ><template #default="scope">
          <div
            v-if="scope.row.state == 1"
            style="display: flex; align-items: center; width: 100%"
            @dblclick="locke(scope)"
          >
            <span v-if="IsEdit[0] != scope.$index || IsEdit[1] != scope.cellIndex">{{
              scope.row.img
            }}</span>
            <el-input
              :minlength="1"
              v-else
              v-model="tmplinks[link(scope.row.sort)].img"
              @keyup.enter="
                tmplinks[link(scope.row.sort)].img = unlock(
                  tmplinks[link(scope.row.sort)].img
                )
              "
            ></el-input>
          </div> </template
      ></el-table-column>
      <el-table-column label="详情"
        ><template #default="scope">
          <div
            v-if="scope.row.state == 1"
            style="display: flex; align-items: center; width: 100%"
            @dblclick="locke(scope)"
          >
            <span v-if="IsEdit[0] != scope.$index || IsEdit[1] != scope.cellIndex">{{
              scope.row.details
            }}</span>
            <el-input
              :minlength="1"
              v-else
              v-model="tmplinks[link(scope.row.sort)].details"
              @keyup.enter="
                tmplinks[link(scope.row.sort)].details = unlock(
                  tmplinks[link(scope.row.sort)].details
                )
              "
            ></el-input>
          </div> </template
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parse } from "node-html-parser";

let x = function (as) {
  let bs = {};
  for (const element in as) {
    if (element == "style") {
      let stylearr = as[element].split(";");
      let tatt = {};

      for (const elementx of stylearr) {
        let styleitem = elementx.split(":");
        styleitem[1] = styleitem[1].replace(/\s/g, "");
        tatt[styleitem[0]] = styleitem[1];
      }
      bs[element] = tatt;
    } else bs[element] = as[element];
  }
  return bs;
};
function traversal(node) {
  //对node的处理
  let re = {};
  if (node && node.nodeType === 1) {
    re.tag = node.localName;
    re.att = x(node.attributes);
    re.son = [];
  }

  let childNodes = node.childNodes;
  let item;
  for (const element of childNodes) {
    item = element;
    if (item.nodeType === 1) {
      //递归先序遍历子节点
      re.son.push(traversal(item));
    }
    if (item.nodeType === 3) {
      let a = item.textContent.trim();
      if (a.length > 0) re.son.push(item.textContent);
    }
  }
  return re;
}
export default {
  name: "FriendSet",

  data() {
    return {
      rawcontent: "",
      IsEdit: [-1, -1],
      tmplinks: [],
      lock: 0,
    };
  },
  methods: {
    locke(scope) {
      if (this.lock != 0) return;
      this.IsEdit = [scope.$index, scope.cellIndex];
      this.lock = 1;
    },
    unlock(key) {
      this.lock = 0;
      this.IsEdit = [-1, -1];
      if (key == "") return "INVALID";
      else return key;
    },
    cancel() {
      this.tmplinks = JSON.parse(JSON.stringify(this.links));
    },
    save() {
      this.$store.commit("update", ["links", this.tmplinks]);
    },
    getcontent() {
      let content = this.rawcontent;
      let root = parse(content);
      let re = traversal(root);
      console.log(re);
    },
    checkunique() {
      let links = this.links;
      let sort = [];
      for (const element in links) {
        sort.push(links[element].sort);
      }
      sort.sort((a, b) => a - b);
      for (let i = 0; i < sort.length - 1; i++) {
        if (sort[i] == sort[i + 1]) {
          return false;
        }
      }
      return true;
    },
  },
  mounted() {
    this.tmplinks = JSON.parse(JSON.stringify(this.links));
  },

  computed: {
    links: function () {
      let links = [];

      for (let element of this.$store.getters.getlinks) {
        element.tmpsort = element.sort;
        links.push(element);
      }
      return links;
    },
    link() {
      return function (sort) {
        let link = -1;
        for (let i in this.tmplinks) {
          if (this.tmplinks[i].sort == sort) {
            link = i;
          }
        }
        return link;
      };
    },
  },
  props: { height: Number },
};
</script>

<style></style>
