import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import userAPI from "../../../src/actions/users";
import FlexBox from "../../../src/components/FlexBox";
import MDataGrid from "../../../src/components/MDataGrid";
import AdminLayout from "../../../src/layouts/AdminLayout";
import NguoiDungItem from "../../../src/models/NguoiDungItem";

const NguoiDung = () => {
  const [selected, setSelected] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  const { data, isLoading } = useQuery(["nguoi-dung"], userAPI.getUsers);

  const handleSetSelected = (data: any) => {
    setSelected(data);
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.data.data.map((item: NguoiDungItem) => ({ ...item, id: item._id }))
      );
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Mật khẩu", flex: 1 },
    { field: "role", headerName: "Mã quyền", flex: 1 },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (cellValues: any) => {
        return (
          <Typography>{cellValues.value ? "Hoạt động" : "Bị khóa"}</Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (cellValues: any) => {
        return (
          <Stack spacing={0.5} direction='row' alignItems={"center"}>
            <Link href={`/admin/nguoi-dung/${cellValues.id}`}>
              <Button variant='contained' color='warning'>
                Cập nhật
              </Button>
            </Link>
            <Button variant='contained' color='error'>
              Xóa
            </Button>
          </Stack>
        );
      },
    },
  ];
  return (
    <AdminLayout>
      <FlexBox justifyContent={"space-between"} alignItems='center' mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          Quản lý người dùng
        </Typography>
        <Link href='/admin/nguoi-dung/them'>
          <Button variant='contained' color='secondary'>
            Thêm người dùng
          </Button>
        </Link>
      </FlexBox>
      <Box mt={5}>
        <MDataGrid
          rows={rows}
          columns={columns}
          handleSelected={handleSetSelected}
          loading={isLoading}
        />
      </Box>
    </AdminLayout>
  );
};

export default NguoiDung;
