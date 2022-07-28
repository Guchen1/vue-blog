<template>
  <div>
    <h1 style="padding-left: 10px; margin-top: 1px; margin-bottom: 15px">
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
      :max-height="height + 60 - 203 + 'px'"
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
              @keyup.esc="
                tmplinks[link(scope.row.sort)].sort = links[link(scope.row.sort)].sort;
                IsEdit = [-1, -1];
                lock = 0;
              "
              @keyup.enter="checkanddo(scope)"
            >
            </el-input-number></div
        ></template>
      </el-table-column>
      <el-table-column label="链接">
        <template #default="scope">
          <div
            style="display: flex; align-items: center; width: 100%"
            @dblclick="locke(scope)"
          >
            <span v-if="IsEdit[0] != scope.$index || IsEdit[1] != scope.cellIndex">{{
              scope.row.link
            }}</span>
            <el-input
              :minlength="1"
              v-else
              v-model="tmplinks[link(scope.row.sort)].link"
              @keyup.esc="
                tmplinks[link(scope.row.sort)].link = links[link(scope.row.sort)].link;
                IsEdit = [-1, -1];
                lock = 0;
              "
              @keyup.enter="
                tmplinks[link(scope.row.sort)].link = unlock(
                  tmplinks[link(scope.row.sort)].link
                )
              "
            ></el-input>
          </div> </template
      ></el-table-column>
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
              @keyup.esc="
                tmplinks[link(scope.row.sort)].name = links[link(scope.row.sort)].name;
                IsEdit = [-1, -1];
                lock = 0;
              "
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
              @keyup.esc="
                tmplinks[link(scope.row.sort)].img = links[link(scope.row.sort)].img;
                IsEdit = [-1, -1];
                lock = 0;
              "
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
              @keyup.esc="
                tmplinks[link(scope.row.sort)].details =
                  links[link(scope.row.sort)].details;
                IsEdit = [-1, -1];
                lock = 0;
              "
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
            style="padding-left: 0px"
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
      <el-button text @click="showmsg()" :disabled="lock == 1 ? true : false"
        >示例</el-button
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
      :width="width >= 1200 ? '50%' : '70%'"
      @closed="isedit2[0] = false"
      v-model="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="isedit2[0] ? '编辑友链' : '添加友链'"
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
                  >输入自定义html,需由el-card组件单元素包裹<br />已提供变量hei为默认卡片高度,js部分使用<br />function(){return{}}进行编写,可查看示例</span
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
        <el-form-item v-if="tmpnew.state != undefined" label="链接">
          <el-input
            :disabled="isedit2[0]"
            v-model="tmpnew.link"
            :minlength="1"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 1" label="头像链接">
          <el-input v-model="tmpnew.img" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 1" label="详细信息">
          <el-input v-model="tmpnew.details" :minlength="1"></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 2" label="模板">
          <el-input
            v-model="tmpnew.template"
            :minlength="1"
            autosize
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 2" label="js">
          <el-input
            v-model="tmpnew.js"
            :minlength="1"
            autosize
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="tmpnew.state == 2" label="css">
          <el-input
            v-model="tmpnew.css"
            :minlength="1"
            autosize
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button
            text
            v-if="tmpnew.state == 2"
            @click="saveadd(1) == true ? (review = true) : null"
            >预览</el-button
          >
          <el-button text @click="dialogFormVisible = false">取消</el-button>
          <el-button text type="primary" @click="saveadd()">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :width="width >= 1200 ? '50%' : '70%'"
      v-model="review"
      :destroy-on-close="true"
      title="预览"
      ><el-scrollbar
        ><InstantRender
          :style="{ width: widthcard + 'px' }"
          :instant="tmpnew"
          :hei="$store.getters.getcardheight"
        ></InstantRender
      ></el-scrollbar>
      <el-slider
        :min="150"
        :max="550"
        style="max-width: 90%; padding-left: 10px"
        v-model="widthcard"
      />
    </el-dialog>
    <el-dialog v-model="example[0]" :width="width >= 1200 ? '50%' : '70%'">
      <el-input
        :readonly="true"
        v-model="example[1]"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 20 }"
      ></el-input>
    </el-dialog>
  </div>
</template>

<script>
import { parse, valid } from "node-html-parser";
import { Delete } from "@element-plus/icons-vue";
import { runFnInVm } from "@/assets/vm.js";
import InstantRender from "@/components/InstantRender.vue";

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
      example: [false, ""],
      review: false,
      widthcard: 260,
    };
  },
  components: {
    // eslint-disable-next-line
    Delete,
    InstantRender,
  },

  methods: {
    showmsg() {
      this.example[0] = true;
    },
    edit2(scope) {
      this.tmpnew = JSON.parse(JSON.stringify(this.tmplinks[this.link(scope.row.sort)]));
      this.isedit2 = [true, scope.row.sort];
      this.dialogFormVisible = true;
    },
    checkanddo(scope) {
      for (let element of this.tmplinks) {
        if (element.tmpsort == this.tmplinks[this.link(scope.row.sort)].tmpsort) {
          if (element != this.tmplinks[this.link(scope.row.sort)]) {
            this.$message.error({ duration: 1000, message: "序号重复！" });
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
    saveadd(type = 0) {
      if (this.tmpnew.state == 1) {
        //console.log(1);
        if (
          typeof this.tmpnew.name == "undefined" ||
          typeof this.tmpnew.link == "undefined" ||
          typeof this.tmpnew.img == "undefined" ||
          typeof this.tmpnew.details == "undefined" ||
          this.tmpnew.name.replace(/\s*/g, "") == "" ||
          this.tmpnew.img.replace(/\s*/g, "") == "" ||
          this.tmpnew.details.replace(/\s*/g, "") == "" ||
          this.tmpnew.link.replace(/\s*/g, "") == ""
        ) {
          this.$message.error({ duration: 1000, message: "请完整填写" });
          return;
        } else {
          let maxsort = 0;
          let maxid = 0;
          for (let element of this.tmplinks) {
            if (element.sort > maxsort) {
              maxsort = element.sort;
            }
          }
          for (let element of this.tmplinks) {
            if (element.id > maxid) {
              maxid = element.id;
            }
          }
          this.tmpnew.sort = maxsort + 1;
          this.tmpnew.id = maxid + 1;
          this.tmplinks.push(JSON.parse(JSON.stringify(this.tmpnew)));
          this.$message.success({ duration: 1000, message: "添加成功" });
          this.dialogFormVisible = false;
        }
      } else if (this.tmpnew.state == 2) {
        if (
          typeof this.tmpnew.name == "undefined" ||
          typeof this.tmpnew.template == "undefined" ||
          typeof this.tmpnew.link == "undefined" ||
          this.tmpnew.name.replace(/\s*/g, "") == "" ||
          this.tmpnew.template.replace(/\s*/g, "") == "" ||
          this.tmpnew.link.replace(/\s*/g, "") == ""
        ) {
          this.$message.error({ duration: 1000, message: "请完整填写" });
          return false;
        } else {
          if (valid(this.tmpnew.template)) {
            let temp = parse(this.tmpnew.template);
            let count = 0;
            for (let element of temp.childNodes) {
              if (element.nodeType == 3) {
                element.textContent = element.textContent.replace(/\s*/g, "");
                if (element.textContent.length > 0) {
                  count = 9999;
                }
              }
              if (element.nodeType == 1) {
                count += 1;
                if (element.localName != "el-card") {
                  count = 99999;
                }
              }
            }
            if (count == 1) {
              //console.log(this.tmpnew.raw.split("【?】").length - 1);
              //console.log(this.tmpnew.variables.split("，"));
              const js = (this.tmpnew.js || "").trim();
              const result = runFnInVm(js, {});
              if (!result.error) {
                if (type == 1) return true;
                let maxsort = 0;
                let maxid = 0;
                if (this.isedit2[0]) {
                  this.tmplinks[this.link(this.isedit2[1])] = JSON.parse(
                    JSON.stringify(this.tmpnew)
                  );
                  this.$message.success({ duration: 1000, message: "修改成功" });
                  this.dialogFormVisible = false;
                  this.isedit2 = [false, -1];
                  return;
                }
                for (let element of this.tmplinks) {
                  if (element.sort > maxsort) {
                    maxsort = element.sort;
                  }
                }
                for (let element of this.tmplinks) {
                  if (element.id > maxid) {
                    maxid = element.id;
                  }
                }
                this.tmpnew.sort = maxsort + 1;
                this.tmpnew.id = maxid + 1;
                this.tmplinks.push(JSON.parse(JSON.stringify(this.tmpnew)));
                this.$message.success({ duration: 1000, message: "添加成功" });
                this.dialogFormVisible = false;
              } else {
                this.$message.error({ duration: 1000, message: "js错误" });
                return false;
              }
            } else {
              this.$message.error({
                duration: 1000,
                message: "根节点不为el-card或非单根节点",
              });
              return false;
            }
          } else {
            this.$message.error({ duration: 1000, message: "语法错误" });
            return false;
          }
        }
      } else {
        this.$message.error({ duration: 1000, message: "请选择类型" });
        return false;
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
      if (key.replace(/\s/g, "") == "") return "INVALID";
      else return key;
    },
    cancel() {
      this.tmplinks = JSON.parse(JSON.stringify(this.links));
      this.cardhei = this.cardheight;
    },
    save() {
      for (let element of this.tmplinks) {
        // eslint-disable-next-line
        for (let key in element) {
          if (element[key] == "INVALID") {
            this.$message.error({ duration: 1000, message: "请完整填写" });
            return;
          }
        }
      }
      for (let element of this.tmplinks) {
        element.tmpsort = element.sort;
      }
      this.$store.commit("update", ["links", this.tmplinks]);
      this.$store.commit("update", ["cardheight", this.cardhei]);
      this.$axios
        .post(this.$server + "/admin/savelinks", {
          links: this.$store.getters.getlinks,
          cardheight: this.$store.getters.getcardheight,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message.success({ duration: 1000, message: "已保存" });
          } else {
            this.$message.error({ duration: 1000, message: "保存失败" });
          }
        })
        .catch(() => {
          this.$message.error({ duration: 1000, message: "保存失败" });
        });
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
    this.example[1] += " <el-card\n";
    this.example[1] += '    shadow="hover"\n';
    this.example[1] += "    :style=\"{ height: hei + 'px' }\"\n";
    this.example[1] += "    :body-style=\"{ height: hei - 40 + 'px' }\"\n";
    this.example[1] += '    ><el-avatar :size="hei - 40" :src="link.img" />\n';
    this.example[1] += "    <div\n";
    this.example[1] += '      :style="{\n';
    this.example[1] += "        height: hei - 40 + 'px',\n";
    this.example[1] += "        width: 'calc( 100% - ' +(hei-40)+'px' + ' )',\n";
    this.example[1] += '      }"\n';
    this.example[1] += '      style="\n';
    this.example[1] += "        display: inline-flex;\n";
    this.example[1] += "        flex-direction: column;\n";
    this.example[1] += "        justify-content: center;\n";
    this.example[1] += "        vertical-align: top;\n";
    this.example[1] += "        line-height: 16px;\n";
    this.example[1] += '      ">\n';
    this.example[1] +=
      '      <div style="text-align: center; font-weight: bold">{{ link.name }}</div>\n';
    this.example[1] += '      <br style="" />\n';
    this.example[1] += '      <div style="word-wrap: break-word; text-align: center">\n';
    this.example[1] += "        {{ link.details }}\n";
    this.example[1] += "      </div>\n";
    this.example[1] += "    </div>\n";
    this.example[1] += "  </el-card>";
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
      const q = document.getElementsByClassName("el-popper");
      setTimeout(() => {
        if (q.length > 0) {
          for (const element of q) {
            element.setAttribute("aria-hidden", "true");
            element.style.display = "none";
          }
        }
      }, 10);
      this.$confirm("未保存的更改将取消", "提示", {
        confirmButtonText: "继续",
        cancelButtonText: "返回",
        type: "warning",
        customClass: "max-wd",
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
  props: { height: Number, width: Number },
};
</script>

<style>
.max-wd {
  max-width: 80%;
  z-index: 100000;
}
body {
  padding: 0px !important;
}
</style>
