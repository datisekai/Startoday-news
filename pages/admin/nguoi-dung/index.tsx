import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userAPI from "../../../src/actions/users";
import FlexBox from "../../../src/components/FlexBox";
import MDataGrid from "../../../src/components/MDataGrid";
import AdminLayout from "../../../src/layouts/AdminLayout";
import NguoiDungItem from "../../../src/models/NguoiDungItem";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";

const NguoiDung = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  const { data, isLoading } = useQuery(["nguoi-dung"], userAPI.getUsers);

  const handleSetSelected = (data: any) => {
    setSelected(data);
  };

  useEffect(() => {
    if (data) {
      setRows(data.map((item: NguoiDungItem) => ({ ...item, id: item._id })));
    }
  }, [data]);

  const { mutate: deleteUser, isLoading: loadingDelete } = useMutation(
    userAPI.deleteUser,
    {
      onSuccess: (result: any, variable) => {
        const _idWasDelete = result.map((item: any) => item.data.data._id);
        let newUsers = data;
        _idWasDelete.forEach((item: string) => {
          newUsers = newUsers?.filter(
            (element: NguoiDungItem) => element._id !== item
          );
        });

        queryClient.setQueryData(["nguoi-dung"], newUsers);
        toast.success("Xóa thành công!");
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err?.message);
      },
    }
  );

  const handleDeleteUsers = (_id: string) => {
    if (!_id) {
      return toast.error("Chọn người dùng cần xóa");
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser([_id]);
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Mật khẩu", width: 200 },
    { field: "role", headerName: "Mã quyền", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <Typography>{cellValues.value ? "Hoạt động" : "Bị khóa"}</Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <Stack spacing={0.5} direction='row' alignItems={"center"}>
            <Link href={`/admin/nguoi-dung/${cellValues.id}`}>
              <IconButton>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDeleteUsers(cellValues.id)}>
              <DeleteIcon />
            </IconButton>
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
