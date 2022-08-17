import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";

const CkEditor = () => {
  function imagePluginFactory(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CloudinaryUnsigned(
        loader,
        "do8rqqyn4",
        "qmpupf7a",
        [160, 500, 1000, 1052]
      );
    };
  }
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [imagePluginFactory],
        outerHeight: 500,
      }}
      data='<p>Hello from CKEditor 5!</p>'
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
      }}
    />
  );
};

export default CkEditor;
