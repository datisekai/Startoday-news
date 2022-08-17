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
import { useQuery } from "@tanstack/react-query";
import newsAPI from "../../../src/actions/news";
import TinTucItem from "../../../src/models/TinTucItem";

const TinTuc = () => {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  const { data, isLoading } = useQuery(["tin-tuc"], newsAPI.getNews);

  const handleSetSelected = (data: any) => {
    setSelected(data);
  };

  useEffect(() => {
    if (data) {
      const newRows = data.map((item: TinTucItem) => ({
        ...item,
        id: item._id,
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
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Ngày update",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <Stack spacing={0.5} direction='row' alignItems={"center"}>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
            <Link href={`/admin/tin-tuc/${cellValues.row.slug}`}>
              <IconButton>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Link>
            <DeleteIcon>
              <VisibilityIcon />
            </DeleteIcon>
          </Stack>
        );
      },
    },
  ];

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
