import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import categoryAPI from "../../../src/actions/category";
import FlexBox from "../../../src/components/FlexBox";
import FormCategory from "../../../src/components/Form/FormCategory";
import MDataGrid from "../../../src/components/MDataGrid";
import AdminLayout from "../../../src/layouts/AdminLayout";
import DanhMucItem from "../../../src/models/DanhMucItem";

const DanhMucAdmin = () => {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState<any>([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery(["danh-muc"], categoryAPI.getCategory);

  useEffect(() => {
    if (data) {
      const categoriesRows = data.map((item: DanhMucItem) => ({
        ...item,
        id: item._id,
      }));
      setRows(categoriesRows);
    }
  }, [data]);

  const { mutate: deleteCategory, isLoading: loadingDelete } = useMutation(
    categoryAPI.deleteCategory,
    {
      onSuccess: (result: any, variable) => {
        const _idWasDelete = result.map((item: any) => item.data.data._id);
        let newCategories = data;
        _idWasDelete.forEach((item: string) => {
          newCategories = newCategories?.filter(
            (element: DanhMucItem) => element._id !== item
          );
        });

        queryClient.setQueryData(["danh-muc"], newCategories);
        toast.success("Xóa thành công!");
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err?.message);
      },
    }
  );

  const handleDeleteCategory = (_id: string) => {
    if (!_id) {
      return toast.error("Chọn danh mục cần xóa");
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory([_id]);
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Tên danh mục", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "parentId",
      headerName: "Danh mục lớn",
      width: 200,
      renderCell: (cellValues: any) => (
        <Typography>{cellValues.row.parentId || "Chưa có"}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <Stack spacing={0.5} direction='row' alignItems={"center"}>
            {/* <Link href={`/admin/danh-muc/${cellValues.id}`}>
              <Button variant='contained' color='warning'>
                Cập nhật
              </Button>
            </Link> */}
            <IconButton onClick={() => handleDeleteCategory(cellValues.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const handleSetSelected = (data: any) => {
    setSelected(data);
  };

  return (
    <AdminLayout>
      <FlexBox justifyContent={"space-between"} alignItems='center' mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          Quản lý danh mục
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant='contained'
          color='secondary'
        >
          Thêm danh mục
        </Button>
      </FlexBox>
      <Box mt={5}>
        <MDataGrid
          rows={rows}
          columns={columns}
          handleSelected={handleSetSelected}
          loading={isLoading}
        />
      </Box>
      <FormCategory
        open={open}
        handleClickOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
      />
    </AdminLayout>
  );
};

export default DanhMucAdmin;
