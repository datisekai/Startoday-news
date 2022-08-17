import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import categoryAPI from "../../../src/actions/category";
import FlexBox from "../../../src/components/FlexBox";
import RenderForm from "../../../src/components/RenderForm";
import AdminLayout from "../../../src/layouts/AdminLayout";
import DanhMucItem from "../../../src/models/DanhMucItem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";

const XuLyTinTuc = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: dataCategories }: any = useQuery([
    "danh-muc",
    categoryAPI.getCategory,
  ]);

  const [html, setHtml] = useState("");

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      status: true,
      category: "",
    },
  });

  const forms: any = [
    {
      type: "textfield",
      name: "title",
      label: "Tiêu đề",
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
      },
    },
    {
      type: "select",
      name: "status",
      label: "Hiển thị",
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
      },
      data: [
        { value: true, text: "Hiển thị" },
        { value: false, text: "Ẩn" },
      ],
    },
    {
      type: "select",
      name: "category",
      label: "Danh mục",
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
      },
      data: dataCategories
        ? dataCategories?.map((item: DanhMucItem) => ({
            text: item.name,
            value: item._id,
          }))
        : [],
    },
  ];

  function imagePluginFactory(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new CloudinaryUnsigned(
        loader,
        "do8rqqyn4",
        "qmpupf7a",
        [160, 500, 1000, 1052]
      );
    };
  }

  console.log(html);

  return (
    <AdminLayout>
      <FlexBox mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          {slug !== "them" ? "Cập nhật tin tức" : "Thêm tin tức"}
        </Typography>
      </FlexBox>
      <Grid container spacing={2} mt={5} sx={{ mx: "auto", width: "100%" }}>
        {forms.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <RenderForm data={item} control={control} errors={errors} />
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [imagePluginFactory],
              outerHeight: 500,
            }}
            data='<p>Hello from CKEditor 5!</p>'
            onReady={(editor: any) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setHtml(data);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {slug === "them" ? (
            <LoadingButton
              loading={false}
              type='submit'
              fullWidth
              color='secondary'
              variant='contained'
              // onClick={handleSubmit(handleAdd)}
            >
              Thêm tin tức
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={false}
              type='submit'
              color='secondary'
              variant='contained'
              // onClick={handleSubmit(handleUpdate)}
            >
              Cập nhật
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default XuLyTinTuc;
