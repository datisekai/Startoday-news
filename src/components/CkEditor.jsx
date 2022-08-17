import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/slices/CkSlice";

const CkEditor = () => {
  function imagePluginFactory(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CloudinaryUnsigned(
        loader,
        process.env.NEXT_PUBLIC_UPLOAD_NAME,
        process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        [160, 500, 1000, 1052]
      );
    };
  }

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.CKEditor);

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [imagePluginFactory],
      }}
      data={value}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        dispatch(setData(data));
      }}
    />
  );
};

export default CkEditor;
