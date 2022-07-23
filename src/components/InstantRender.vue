<script>
import { h } from "vue";
import { ElCard, ElAvatar } from "element-plus";

let s = {
  ElCard: ElCard,
  ElAvatar: ElAvatar,
  "el-card": ElCard,
  "el-avatar": ElAvatar,
  h: h,
};
export default {
  created() {},
  data() {
    return {};
  },
  render() {
    return h(
      s["ElCard"],
      {
        shadow: "hover",
        style: { height: "96px" },
      },
      () => [
        h(ElAvatar, {
          size: 50,
          src: "",
        }),
        h(
          "div",
          {
            class: "textm",
          },
          [
            h("div", { class: "name" }, ["hello, world"]),
            h("div", { class: "intro" }, "hello, world"),
          ]
        ),
      ]
    );
  },
  props: {},
  methods: {},
};
</script>

<style></style>
