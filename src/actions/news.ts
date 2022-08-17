import axiosClient from "../axios/axiosClient";
import axiosUpload from "../axios/axiosUpload";

const newsAPI = {
  uploadImage: async (formData: any) => {
    return await axiosUpload.post("/", formData);
  },
  addNews: async (data: any) => {
    const res = await axiosClient.post("/tin-tuc", data);
    return res.data.data;
  },
  getNews: async (data: any) => {
    const res = await axiosClient.get("/tin-tuc");
    return res.data.data;
  },
};

export default newsAPI;
