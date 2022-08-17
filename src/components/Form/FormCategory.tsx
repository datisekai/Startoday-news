import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import MTextField from "../MTextField";
import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryAPI from "../../actions/category";
import toast from "react-hot-toast";
import DanhMucItem from "../../models/DanhMucItem";

interface FormCategoryProps {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  row?: any;
}

const FormCategory: React.FC<FormCategoryProps> = ({
  open,
  handleClickOpen,
  handleClose,
  row,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();
  const categories: DanhMucItem[] =
    queryClient.getQueryData(["danh-muc"]) || [];

  React.useEffect(() => {
    if (row) {
      setValue("name", row.name);
    }
  }, [row]);

  const { mutate: addCategory, isLoading } = useMutation(
    categoryAPI.addCategory,
    {
      onSuccess: (result) => {
        queryClient.setQueryData(["danh-muc"], [...categories, result]);
        toast("Thêm thành công!", {
          icon: "👏",
        });
        setValue("name", "");
        handleClose();
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );

  const handleAdd = (data: any) => {
    addCategory(data);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{row ? "Cập nhật" : "Thêm danh mục"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Để thêm/cập nhật danh mục, vui lòng nhập tên danh mục vào dưới dây,
            chúng tôi sẽ xử lý danh mục
          </DialogContentText>
          <Box mt={2}>
            <MTextField
              control={control}
              error={errors}
              label={"Tên danh mục"}
              name={"name"}
              rules={{
                required: {
                  value: true,
                  message: "Bắt buộc",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit(handleAdd)}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormCategory;
