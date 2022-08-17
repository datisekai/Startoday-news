import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryAPI from "../../../src/actions/category";
import FlexBox from "../../../src/components/FlexBox";
import RenderForm from "../../../src/components/RenderForm";
import AdminLayout from "../../../src/layouts/AdminLayout";
import DanhMucItem from "../../../src/models/DanhMucItem";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/redux/store";
import newsAPI from "../../../src/actions/news";

const XuLyTinTuc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { value: html } = useSelector((state: RootState) => state.CKEditor);
  const { user } = useSelector((state: RootState) => state.Auth);
  const { data: dataCategories }: any = useQuery(
    ["danh-muc"],
    categoryAPI.getCategory
  );

  const [file, setFile] = useState<any>();

  const CkEditor = dynamic(() => import("../../../src/components/CkEditor"), {
    ssr: false,
  });
  useEffect(() => {
    return () => file && URL.revokeObjectURL(file.preview);
  }, [file]);

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
      description: "",
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
      type: "textfield",
      name: "description",
      label: "Mô tả ngắn",
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

  const { mutate: addNews, isLoading: loadingAdd } = useMutation(
    newsAPI.addNews,
    {
      onSuccess: (result) => {
        console.log(result);
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );

  const handleAdd = async (data: any) => {
    if (!file) {
      return toast.error("Bạn chưa chọn ảnh nền!");
    }

    if (!html) {
      return toast.error("Bạn chưa nhập chi tiết news!");
    }

    let image = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );
      const response = await newsAPI.uploadImage(formData);
      image = response.data.url;
    }

    addNews({ ...data, avatar: image, html: html, author: user._id });
  };

  return (
    <AdminLayout>
      <FlexBox mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          {id !== "them" ? "Cập nhật tin tức" : "Thêm tin tức"}
        </Typography>
      </FlexBox>

      {file && file.preview && (
        <Box mt={2}>
          <img
            style={{
              width: "300px",
              margin: "0px auto",
              borderRadius: "10px",
              marginLeft: "16px",
            }}
            src={file.preview}
            alt=''
          />
        </Box>
      )}

      <Grid container spacing={2} mt={2} sx={{ mx: "auto", width: "100%" }}>
        {forms.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <RenderForm data={item} control={control} errors={errors} />
            </Grid>
          );
        })}
        <Grid item xs={12} md={6}>
          <Button
            size='large'
            color='primary'
            variant='contained'
            component='label'
          >
            Chọn ảnh nền
            <input
              hidden
              accept='image/*'
              onChange={(e: any) => {
                const file = e.target.files[0];
                const preview = URL.createObjectURL(file);
                file.preview = preview;

                setFile(file);
              }}
              multiple
              type='file'
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CkEditor />
        </Grid>
        <Grid item xs={12}>
          {id === "them" ? (
            <LoadingButton
              loading={false}
              type='submit'
              size='large'
              color='secondary'
              variant='contained'
              onClick={handleSubmit(handleAdd)}
            >
              Thêm tin tức
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={false}
              type='submit'
              size='large'
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
