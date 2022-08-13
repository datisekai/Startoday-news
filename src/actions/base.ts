import axiosClient from "../axios/axiosClient";
import NewsBaseItem from "../models/NewsBaseItem";

const baseAPI = {
  getData: async (slug: string): Promise<NewsBaseItem[]> => {
    return (await axiosClient.get(`/co-ban?slug=${slug}`)).data.data;
  },
  getDetail: (id: string | undefined) => {
    return axiosClient.get(`/co-ban/chi-tiet?id=${id}`);
  },
};

export default baseAPI;
