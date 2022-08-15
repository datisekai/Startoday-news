import axiosClient from "../axios/axiosClient";

const roleAPI = {
  getRole: () => axiosClient.get("/loai-nguoi-dung"),
};

export default roleAPI;
