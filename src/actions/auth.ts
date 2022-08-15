import axiosClient from "../axios/axiosClient";

const AuthAPI = {
  login: (data: any) => axiosClient.post("/dang-nhap", data),
};

export default AuthAPI;
