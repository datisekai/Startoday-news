import axiosClient from "../axios/axiosClient";
import DanhMucItem from "../models/DanhMucItem";
import TinTucItem from "../models/TinTucItem";

interface CategoryAPI {
  getCategory: () => Promise<DanhMucItem[]>;
  addCategory: (data: DanhMucItem) => Promise<DanhMucItem>;
  deleteCategory: (_ids: string[]) => any;
  searchCategory: ({ text, category }: any) => Promise<TinTucItem[]>;
}

const categoryAPI: CategoryAPI = {
  getCategory: async () => {
    const res = await axiosClient.get("/danh-muc");
    return res.data.data;
  },
  addCategory: async (data: DanhMucItem) => {
    const res = await axiosClient.post("/danh-muc", data);
    return res.data.data;
  },
  deleteCategory: (_ids: string[]) => {
    return Promise.all(
      _ids.map((item: string) => axiosClient.delete(`/danh-muc?_id=${item}`))
    );
  },
  searchCategory: async ({ text, category }: any) => {
    console.log(text, category);
    const res = await axiosClient.get(
      `/tim-kiem?text=${text}&category=${category}`
    );
    return res.data.data;
  },
};

export default categoryAPI;
