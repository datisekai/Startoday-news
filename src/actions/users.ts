import axiosClient from "../axios/axiosClient";
import NguoiDungItem from "../models/NguoiDungItem";

interface UserAPI {
  getUsers: () => Promise<NguoiDungItem[]>;
  getOnlyUser: (_id: string) => Promise<NguoiDungItem>;
  addUser: (data: NguoiDungItem) => Promise<NguoiDungItem>;
  updateUser: (data: NguoiDungItem) => Promise<NguoiDungItem>;
  deleteUser: (_ids: string[]) => any;
}

const userAPI: UserAPI = {
  getUsers: async () => {
    const res = await axiosClient.get("/nguoi-dung");
    return res.data.data;
  },
  getOnlyUser: async (_id: string) => {
    const res = await axiosClient.get(`/nguoi-dung/${_id}`);
    return res.data.data;
  },
  addUser: async (data: NguoiDungItem) => {
    const res = await axiosClient.post("/nguoi-dung", data);
    return res.data.data;
  },
  updateUser: async (data: NguoiDungItem) => {
    const res = await axiosClient.put("/nguoi-dung", data);
    return res.data.data;
  },
  deleteUser: (_ids: string[]) => {
    const res = Promise.all(
      _ids.map((item: string) => axiosClient.delete(`/nguoi-dung?_id=${item}`))
    );
    return res;
  },
};

export default userAPI;
