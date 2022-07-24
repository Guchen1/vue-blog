<template>
  <div>
    <h1 style="padding-left: 10px">
      友链设置
      <div style="display: inline-block; padding-left: 20px">
        <div></div>
        <el-button text @click="save" :disabled="lock == 1 ? true : false"
          >保存</el-button
        >
        <el-button text @click="cancel" :disabled="lock == 0 ? false : true"
          >重置</el-button
        >
      </div>
    </h1>
    <el-table
      :data="tmplinks"
      :default-sort="{ prop: 'sort', order: 'ascending' }"
      style="width: 100%"
      :max-height="height + 60 - 183 + 'px'"
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
              @keyup.enter="checkanddo(scope)"
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
          </div>
          <el-button
            v-else
            text
            @click="edit2(scope)"
            type="warning"
            style="padding-left: 5px"
            :disabled="lock == 1 ? true : false"
            >编辑</el-button
          ></template
        ></el-table-column
      >
      <el-table-column fixed="right" label="操作" width="60px">
        <template #default="scope">
          <el-button
            :disabled="lock == 1 ? true : false"
            @click="del(scope)"
            type="danger"
            text
            style="padding-left: 5px"
            ><el-icon><Delete /></el-icon></el-button></template
      ></el-table-column>
    </el-table>
    <el-space wrap style="padding-top: 20px">
      <el-button text type="primary" @click="add" :disabled="lock == 1 ? true : false"
        >添加</el-button
      >

      <el-space>
        默认卡片高度:
        <el-slider
          :disabled="lock == 1 ? true : false"
          :min="100"
          :max="150"
          style="width: 100px; padding-left: 10px"
          v-model="cardhei"
        />
      </el-space>
    </el-space>
    <el-dialog
      v-model="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="添加友链"
    >
      <el-form v-model="tmpnew" label-position="left" label-width="70px">
        <el-form-item label="类型">
          <el-select v-model="tmpnew.state" :disabled="isedit2[0]">
            <el-tooltip v-model:visible="visiible" placement="top">
              <template #content>
                <span>输入友链名称-标题,图片链接,详细信息,快速生成</span>
              </template>

              <el-option
                label="默认卡片"
                :value="1"
                @mouseenter="visiible = true"
                @mouseleave="visiible = false"
              ></el-option>
            </el-tooltip>
            <el-tooltip v-model:visible="visible" placement="bottom">
              <template #content>
                <span
                  >输入自定义html,需由el-card组件单元素包裹,可使用javascipt语句,<br />将【?】作为占位符,在下方按顺序以全角逗号分隔输入,注意全半角,<br />外部提供卡片宽度变量hei</span
                >
              </template>

              <el-option
                label="自制卡片"
                :value="2"
                @mouseenter="visible = true"
                @mouseleave="visible = false"
              ></el-option>
            </el-tooltip>
          </el-select>
        </el-form-item>
        <el-form-item v-if="tmpnew.state != undefined" label="名称">
          <el-input
            :disabled="isedit2[0]"
            v-model="tmpnew.name"
            :minlength="1"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 1" label="头像链接">
          <el-input v-model="tmpnew.img" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 1" label="详细信息">
          <el-input v-model="tmpnew.details" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 2" label="HTML">
          <el-input
            v-model="tmpnew.raw"
            :minlength="1"
            autosize
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 2" label="变量">
          <el-input v-model="tmpnew.variables" :minlength="1"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button text v-if="tmpnew.state == 2">预览</el-button>
          <el-button text @click="dialogFormVisible = false">取消</el-button>
          <el-button text type="primary" @click="saveadd()">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { parse, valid } from "node-html-parser";
import { Delete } from "@element-plus/icons-vue";

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
      cardhei: 0,
      dialogFormVisible: false,
      tmpnew: {},
      visible: false,
      visiible: false,
      isedit2: [false, -1],
    };
  },
  components: {
    // eslint-disable-next-line
    Delete,
  },

  methods: {
    edit2(scope) {
      this.tmpnew = JSON.parse(JSON.stringify(this.tmplinks[this.link(scope.row.sort)]));
      this.isedit2 = [true, scope.row.sort];
      this.dialogFormVisible = true;
    },
    checkanddo(scope) {
      for (let element of this.tmplinks) {
        if (element.tmpsort == this.tmplinks[this.link(scope.row.sort)].tmpsort) {
          if (element != this.tmplinks[this.link(scope.row.sort)]) {
            this.$message.error("序号重复！");
            return;
          }
        }
      }

      this.IsEdit = [-1, -1];
      this.lock = 0;
      this.tmplinks[this.link(scope.row.sort)].sort = this.tmplinks[
        this.link(scope.row.sort)
      ].tmpsort;
    },
    saveadd() {
      if (this.tmpnew.state == 1) {
        //console.log(1);
        if (
          typeof this.tmpnew.name == "undefined" ||
          typeof this.tmpnew.img == "undefined" ||
          typeof this.tmpnew.details == "undefined" ||
          this.tmpnew.name.replace(/\s*/g, "") == "" ||
          this.tmpnew.img.replace(/\s*/g, "") == "" ||
          this.tmpnew.details.replace(/\s*/g, "") == ""
        ) {
          this.$message.error("请完整填写");
          return;
        } else {
          let maxsort = 0;
          for (let element of this.tmplinks) {
            if (element.sort > maxsort) {
              maxsort = element.sort;
            }
          }
          this.tmpnew.sort = maxsort + 1;
          this.tmplinks.push(JSON.parse(JSON.stringify(this.tmpnew)));
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
        }
      } else if (this.tmpnew.state == 2) {
        if (
          typeof this.tmpnew.name == "undefined" ||
          typeof this.tmpnew.raw == "undefined" ||
          this.tmpnew.name.replace(/\s*/g, "") == "" ||
          this.tmpnew.raw.replace(/\s*/g, "") == ""
        ) {
          this.$message.error("请完整填写");
          return;
        } else {
          if (valid(this.tmpnew.raw)) {
            let temp = parse(this.tmpnew.raw);
            if (
              temp.childNodes.length == 1 &&
              temp.childNodes[0].localName == "el-card"
            ) {
              //console.log(this.tmpnew.raw.split("【?】").length - 1);
              //console.log(this.tmpnew.variables.split("，"));
              if (
                (this.tmpnew.raw.split("【?】").length == 0
                  ? 0
                  : this.tmpnew.raw.split("【?】").length - 1) ==
                (this.tmpnew.variables == ""
                  ? 0
                  : this.tmpnew.variables.split("，").length)
              ) {
                let maxsort = 0;
                if (this.isedit2[0]) {
                  this.tmplinks[this.link(this.isedit2[1])] = JSON.parse(
                    JSON.stringify(this.tmpnew)
                  );
                  this.$message.success("修改成功");
                  this.dialogFormVisible = false;
                  this.isedit2 = [false, -1];
                  return;
                }
                for (let element of this.tmplinks) {
                  if (element.sort > maxsort) {
                    maxsort = element.sort;
                  }
                }
                this.tmpnew.parsed = traversal(temp.childNodes[0]);
                this.tmpnew.sort = maxsort + 1;

                this.tmplinks.push(JSON.parse(JSON.stringify(this.tmpnew)));
                this.$message.success("添加成功");
                this.dialogFormVisible = false;
              } else {
                this.$message.error("javascript错误");
              }
            } else {
              this.$message.error("根节点不为el-card或非单根节点");
            }
          } else {
            this.$message.error("语法错误");
          }
        }
      } else {
        this.$message.error("请选择类型");
        return;
      }
    },
    del(scope) {
      let a = this.tmplinks.findIndex((element) => {
        if (element.sort == scope.row.sort) {
          return true;
        }
      });
      this.tmplinks.splice(a, 1);
    },
    add() {
      this.tmpnew = {};
      this.dialogFormVisible = true;
    },
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
      for (let element of this.tmplinks) {
        element.tmpsort = element.sort;
      }
      this.$store.commit("update", ["links", this.tmplinks]);
      this.$store.commit("update", ["cardheight", this.cardhei]);
      this.$message.success("已保存");
    },
    getcontent() {
      let content = this.rawcontent;
      let root = parse(content);
      // eslint-disable-next-line
      let re = traversal(root);
      //console.log(re);
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
    //this.$store.commit("update", ["links", JSON.parse(JSON.stringify(this.tmplinks))]);
    this.cardhei = this.cardheight;
  },
  watch: {
    cardheight(val) {
      this.cardhei = val;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (
      JSON.stringify(this.tmplinks) == JSON.stringify(this.links) &&
      this.cardhei == this.cardheight
    ) {
      //就是上面的状态 如果是true , 则不询问是否保存, 当然这个方法比较笨, 大家可以使用更优雅的方式
      next();
    } else {
      this.$confirm("未保存的更改将取消", "提示", {
        confirmButtonText: "继续",
        cancelButtonText: "返回",
        type: "warning",
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    }
  },
  computed: {
    links: function () {
      return this.$store.getters.getlinks;
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
    cardheight() {
      return this.$store.getters.getcardheight;
    },
  },
  props: { height: Number },
};
</script>

<style></style>
