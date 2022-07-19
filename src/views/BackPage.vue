<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    @ready="onReady"
    :config="editorConfig"
  ></ckeditor>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import DecoupledEditor from "@ckeditor/ckeditor5-custom-build";

export default {
  components: {
    ckeditor: CKEditor.component,
  },

  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    editorData() {
      console.log(this.editorData);
    },
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
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
      },
    };
  },
};
</script>
<style>
.ck-editor__editable_inline {
  height: 670px !important;
}
</style>
