import { Box, Button, Stack, Typography, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBox from "../src/components/FlexBox";
import { primary } from "../src/theme/themeColors";
import { useForm } from "react-hook-form";
import MTextField from "../src/components/MTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../src/actions/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../src/redux/slices/AuthSlice";
import { useRouter } from "next/router";
import { RootState } from "../src/redux/store";
import Spinner from "../src/components/Loading/Spinner";

const DangNhap = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const { mutate: login, isLoading } = useMutation(AuthAPI.login, {
    onSuccess: (result, variable) => {
      dispatch(setAuth(result.data.data));

      toast("Đăng nhập thành công!", {
        icon: "👏",
      });
      const { user } = result.data.data;
      if (user && user.role !== 0) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const customTextField = {
    ".css-kobfq2-MuiInputBase-root-MuiOutlinedInput-root": {
      backgroundColor: primary[200],
    },
  };

  const handleLogin = (data: any) => {
    login(data);
  };

  const { user } = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    if (user) {
      user.role !== 0 ? router.push("/admin") : router.push("/");
    }
  }, [user]);

  if (user) {
    return <Spinner />;
  }

  return (
    <FlexBox
      alignItems={"center"}
      justifyContent='center'
      minHeight={"100vh"}
      bgcolor={primary[200]}
    >
      <Box width={{ sm: 500, xs: "90%" }}>
        <Typography fontWeight={600} textAlign='center' mb={2} fontSize={20}>
          Wellcome to StarToday!
        </Typography>
        <Box
          sx={{
            bgcolor: primary[100],
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              bgcolor: primary[900],
              width: "100%",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              color: primary[200],
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              p: 1,
            }}
            textAlign='center'
          >
            Not a member?{" "}
            <Button variant='text' color='info'>
              Sign up now
            </Button>
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={1} mt={2} px={5} py={3}>
              <MTextField
                control={control}
                error={errors}
                label={"Email"}
                name={"email"}
                rules={{
                  required: {
                    value: true,
                    message: "Bắt buộc",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không đúng định dạng",
                  },
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>@</InputAdornment>
                  ),
                }}
                customSx={customTextField}
              />
              <MTextField
                name='password'
                control={control}
                error={errors}
                label='Mật khẩu'
                type={showPassword ? "text" : "password"}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <IconButton
                        size='small'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize='small' />
                        ) : (
                          <Visibility fontSize='small' />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Bắt buộc",
                  },
                  minLength: {
                    value: 4,
                    message: "Không được dưới 4 kí tự",
                  },
                }}
                customSx={customTextField}
              />
              <LoadingButton
                loading={isLoading}
                type='submit'
                color='secondary'
                variant='contained'
                startIcon={<VpnKeyIcon />}
                onClick={handleSubmit(handleLogin)}
              >
                Đăng nhập
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Box>
    </FlexBox>
  );
};

export default DangNhap;
