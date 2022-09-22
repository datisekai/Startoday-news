import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import categoryAPI from "../../../src/actions/category";
import newsAPI from "../../../src/actions/news";
import FlexBox from "../../../src/components/FlexBox";
import AdminLayout from "../../../src/layouts/AdminLayout";
import DanhMucItem from "../../../src/models/DanhMucItem";

const XuLyTinTuc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: dataCategories }: any = useQuery(
    ["danh-muc"],
    categoryAPI.getCategory
  );

  const CkEditor = dynamic(() => import("../../../src/components/CkEditor"), {
    ssr: false,
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
      type: "textfield",
      name: "slug",
      label: "URL",
      rules: {},
    },
    {
      type: "select",
      name: "status",
      label: "Hiển thị",
      rules: {},
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

  return (
    <AdminLayout>
      <FlexBox mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          {id !== "them" ? "Cập nhật tin tức" : "Thêm tin tức"}
        </Typography>
      </FlexBox>

      <CkEditor id={id} forms={forms} />
    </AdminLayout>
  );
};

export default XuLyTinTuc;
