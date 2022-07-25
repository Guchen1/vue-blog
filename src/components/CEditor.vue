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
      if (this.isDark) {
        document.getElementsByClassName("ck-editor__editable")[0].style.background =
          "#141414";
      } else {
        document.getElementsByClassName("ck-editor__editable")[0].style.background =
          "#ffffff";
      }
    },
  },

  async mounted() {
    if (this.disabled) {
      this.editorData = this.maybeEditorData;
      setTimeout(() => {
        if (this.isDark) {
          document.getElementsByClassName("ck-editor__editable")[0].style.background =
            "#141414";
        } else {
          document.getElementsByClassName("ck-editor__editable")[0].style.background =
            "#ffffff";
        }
        document.getElementsByClassName("ck-editor__top")[0].style.display = "none";
      }, 90);

      return;
    }

    await this.$axios.get(this.$server + "/words?passage=1").then((res) => {
      this.editorData = res.data;
    });
  },
  created() {
    if (this.disabled) {
      this.editorConfig.toolbar.items = [];

      return;
    }
    const a = this.$axios;
    const b = this.$server;

    c = this.editorData;

    this.editorConfig.autosave = {
      save() {
        a.post(b + "/words?passage=1", { content: c }).then((res) => {
          c = res.data;
        });
      },
    };
  },

  data() {
    return {
      q: 0,
      editor: DecoupledEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        language: "zh-cn",
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: this.$server + "/image",
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
</style>
