<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :disabled="disabled"
    :config="editorConfig"
  ></ckeditor>
</template>

<script>
var c;
import CKEditor from "@ckeditor/ckeditor5-vue";
import DecoupledEditor from "chen-ck-build";
export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maybeEditorData: {
      type: String,
      default: "",
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isDark() {
      this.colorb = this.isDark ? "#141414" : "#ffffff";
    },
  },

  async mounted() {
    if (this.disabled) {
      this.editorData = this.maybeEditorData;
      let q = setInterval(() => {
        if (document.getElementsByClassName("ck-editor__top").length > 0) {
          clearInterval(q);
          document.getElementsByClassName("ck-editor__top")[0].hidden = true;
        }
      }, 1);
      return;
    }

    await this.$axios.get(this.$server + "/words?passage=1").then((res) => {
      this.editorData = res.data;
    });
  },
  created() {
    this.colorb = this.isDark ? "#141414" : "#ffffff";
    if (this.disabled) {
      this.editorConfig.toolbar.items = [];
      return;
    }
    const a = this.$axios;
    const b = this.$server;

    c = this.editorData;

    this.editorConfig.autosave = {
      save() {
        a.post(b + "/admin/words?passage=1", { content: c }).then((res) => {
          c = res.data;
        });
      },
    };
  },
  methods: {},

  data() {
    return {
      q: 0,
      colorb: "",
      editor: DecoupledEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        language: "zh-cn",
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: this.$server + "/admin/image",
        },
        autosave: {},
        toolbar: {
          shouldNotGroupWhenFull: true,
        },
      },
    };
  },
};
</script>
<style>
.ck-editor__editable_inline {
  overflow-wrap: break-word;
}
.ck-read-only {
  border: 0px !important;
}

.ck-editor__editable {
  background: v-bind(colorb) !important;
}
</style>
