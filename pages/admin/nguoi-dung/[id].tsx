import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import FlexBox from "../../../src/components/FlexBox";
import { useForm } from "react-hook-form";
import AdminLayout from "../../../src/layouts/AdminLayout";
import MTextField from "../../../src/components/MTextField";
import MSelect from "../../../src/components/MSelect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import roleAPI from "../../../src/actions/role";
import MSwitch from "../../../src/components/MSwitch";
import { primary } from "../../../src/theme/themeColors";
import LoadingButton from "@mui/lab/LoadingButton";
import userAPI from "../../../src/actions/users";
import NguoiDungItem from "../../../src/models/NguoiDungItem";
import toast from "react-hot-toast";

const XuLyNguoiDung = () => {
  const queryClient = useQueryClient();
  const users: any = queryClient.getQueryData(["nguoi-dung"]);
  const router = useRouter();
  const { id = "them" } = router.query;

  const { data: dataRole } = useQuery(["role"], roleAPI.getRole);
  const { data } = useQuery(["nguoi-dung-detail", id], () => {
    if (id !== "them") {
      return userAPI.getOnlyUser(id.toString());
    }
  });

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: 0,
      status: true,
    },
  });

  useEffect(() => {
    if (id !== "them" && data) {
      const currentUser: NguoiDungItem = data.data.data;
      setValue("email", currentUser.email);
      setValue("password", currentUser.password);
      setValue("role", currentUser.role);
      setValue("status", currentUser.status);
    }
  }, [id, data]);

  const clearForm = () => {
    setValue("email", "");
    setValue("password", "");
    setValue("role", 0);
    setValue("status", true);
  };

  const forms = [
    {
      type: "textfield",
      name: "email",
      label: "Email",
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Email không đúng định dạng",
        },
      },
    },
    {
      type: "textfield",
      name: "password",
      label: "Mật khẩu",
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
        minLength: {
          value: 4,
          message: "Không được dưới 4 kí tự",
        },
      },
    },
    {
      type: "select",
      name: "role",
      label: "Loại quyền",
      data: dataRole
        ? dataRole.data.data.map((item: any) => ({
            value: item._id,
            text: item.name,
          }))
        : [],
      rules: {
        required: {
          value: true,
          message: "Bắt buộc",
        },
      },
    },
    {
      type: "switch",
      label: "Trạng thái",
      name: "status",
      rules: {},
    },
  ];

  const { mutate: addUser, isLoading: loadingAdd } = useMutation(
    userAPI.addUser,
    {
      onSuccess: (result) => {
        queryClient.setQueriesData(["nguoi-dung"], {
          ...users,
          data: { ...users.data, data: [...users.data.data, result.data.data] },
        });

        toast("Thêm thành công!", {
          icon: "👏",
        });
        clearForm();
        router.push("/admin/nguoi-dung");
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );
  const handleAdd = (data: any) => {
    addUser(data);
  };

  const { mutate: updateUser, isLoading: loadingUpdate } = useMutation(
    userAPI.updateUser,
    {
      onSuccess: (result) => {
        const newUsers = users.data.data.map((item: NguoiDungItem) => {
          if (item._id === id.toString()) {
            return { ...result.data.data };
          }
          return item;
        });

        console.log(newUsers);
        queryClient.setQueriesData(["nguoi-dung"], {
          ...users,
          data: { ...users.data, data: newUsers },
        });
        toast("Cập nhật thành công!", {
          icon: "👏",
        });
        clearForm();
        router.push("/admin/nguoi-dung");
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );

  const handleUpdate = (data: any) => {
    updateUser({ ...data, _id: id });
  };

  return (
    <AdminLayout>
      <FlexBox mt={2}>
        <Typography fontWeight={500} fontSize={18}>
          {id !== "them" ? "Cập nhật người dùng" : "Thêm người dùng"}
        </Typography>
      </FlexBox>
      <Grid container spacing={2} mt={5} sx={{ maxWidth: 500 }}>
        {forms.map((item: any, index: number) => {
          const render = () => {
            if (item.type === "textfield") {
              return (
                <MTextField
                  control={control}
                  error={errors}
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                  customSx={{
                    ".css-1wvp7yn-MuiInputBase-input-MuiOutlinedInput-input": {
                      backgroundColor: primary[100],
                    },
                  }}
                />
              );
            } else if (item.type === "select") {
              return (
                <MSelect
                  control={control}
                  data={item.data}
                  error={errors}
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                />
              );
            } else if (item.type === "switch") {
              return (
                <MSwitch
                  control={control}
                  error={errors}
                  label={item.label}
                  name={item.name}
                />
              );
            }
          };
          return (
            <Grid item xs={12} md={12} key={index}>
              {render()}
            </Grid>
          );
        })}
        <Grid item xs={12} pl={2}>
          {id === "them" ? (
            <LoadingButton
              loading={loadingAdd}
              type='submit'
              fullWidth
              color='secondary'
              variant='contained'
              onClick={handleSubmit(handleAdd)}
            >
              Thêm người dùng
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={false}
              fullWidth
              type='submit'
              color='secondary'
              variant='contained'
              onClick={handleSubmit(handleUpdate)}
            >
              Cập nhật
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default XuLyNguoiDung;
