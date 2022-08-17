import axiosClient from "../axios/axiosClient";
import axiosUpload from "../axios/axiosUpload";
import TinTucItem from "../models/TinTucItem";

const newsAPI = {
  uploadImage: async (formData: any) => {
    return await axiosUpload.post("/", formData);
  },
  addNews: async (data: any) => {
    const res = await axiosClient.post("/tin-tuc", data);
    return res.data.data;
  },
  getNews: async () => {
    const res = await axiosClient.get("/tin-tuc");
    return res.data.data;
  },
  deleteNews: (_ids: string[]) => {
    return Promise.all(
      _ids.map((item: string) => axiosClient.delete(`/tin-tuc?_id=${item}`))
    );
  },
  getDetailNews: async (slug: string) => {
    const res = await axiosClient.get(`/tin-tuc/detail/${slug}`);
    return res.data.data;
  },
  updateNews: async (data: TinTucItem) => {
    const res = await axiosClient.put("/tin-tuc", data);
    return res.data.data;
  },
};

export default newsAPI;
