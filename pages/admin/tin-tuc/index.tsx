import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FlexBox from "../../../src/components/FlexBox";
import MDataGrid from "../../../src/components/MDataGrid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AdminLayout from "../../../src/layouts/AdminLayout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newsAPI from "../../../src/actions/news";
import TinTucItem from "../../../src/models/TinTucItem";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import dayjs from "dayjs";

const TinTuc = () => {
  const [rows, setRows] = useState([]);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState([]);

  const { data, isLoading } = useQuery(["tin-tuc"], newsAPI.getNews);

  const handleSetSelected = (data: any) => {
    setSelected(data);
  };

  useEffect(() => {
    if (data) {
      const newRows = data.map((item: TinTucItem) => ({
        ...item,
        id: item.slug,
      }));
      setRows(newRows);
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "URL", width: 200 },
    { field: "title", headerName: "Tiêu đề", width: 200 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 200,
      renderCell: (cellValues: any) => (
        <LazyLoadImage
          height={"100%"}
          src={cellValues.row.avatar}
          style={{ borderRadius: "5px" }}
        />
      ),
    },
    {
      field: "category",
      headerName: "Danh mục",
      width: 150,
      renderCell: (cellValues: any) => (
        <Typography>{cellValues.row.category.name}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 100,
      renderCell: (cellValues: any) => (
        <Typography>{cellValues.row.status ? "Hiển thị" : "Ẩn"}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 100,
      renderCell: (cellValues: any) => (
        <Typography>
          {dayjs(cellValues.row.createdAt).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Ngày update",
      width: 100,
      renderCell: (cellValues: any) => (
        <Typography>
          {dayjs(cellValues.row.updatedAt).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <Stack spacing={0} direction='row' alignItems={"center"}>
            <Link href={`/${cellValues.row.slug}`}>
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </Link>
            <Link href={`/admin/tin-tuc/${cellValues.row.slug}`}>
              <IconButton>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDeleteNews(cellValues.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const { mutate: deleteNews, isLoading: loadingDelete } = useMutation(
    newsAPI.deleteNews,
    {
      onSuccess: (result: any, variable) => {
        const _idWasDelete = result.map((item: any) => item.data.data._id);
        let newNews = data;
        _idWasDelete.forEach((item: string) => {
          newNews = newNews?.filter(
            (element: TinTucItem) => element._id !== item
          );
        });

        queryClient.setQueryData(["tin-tuc"], newNews);
        toast.success("Xóa thành công!");
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err?.message);
      },
    }
  );

  const handleDeleteNews = (_id: string) => {
    if (!_id) {
      return toast.error("Chọn tin cần xóa");
    }

    confirmAlert({
      title: `Thông báo`,
      message: "Bạn có chắc chắn muốn xóa?",
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => deleteNews([_id]),
        },
        {
          label: "Hủy",
        },
      ],
    });
  };

  return (
    <AdminLayout>
      <FlexBox justifyContent={"space-between"} alignItems='center' mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          Quản lý tin tức
        </Typography>
        <Link href='/admin/tin-tuc/them'>
          <Button variant='contained' color='secondary'>
            Thêm tin tức
          </Button>
        </Link>
      </FlexBox>
      <Box mt={5}>
        <MDataGrid
          rows={rows}
          columns={columns}
          handleSelected={handleSetSelected}
          loading={false}
        />
      </Box>
    </AdminLayout>
  );
};

export default TinTuc;
