import axiosClient from "../axios/axiosClient";

const userAPI = {
  getUsers: () => axiosClient.get("/nguoi-dung"),
  getOnlyUser: (_id: string) => axiosClient.get(`/nguoi-dung/${_id}`),
  addUser: (data: any) => axiosClient.post("/nguoi-dung", data),
  updateUser: (data: any) => axiosClient.put("/nguoi-dung", data),
};

export default userAPI;
