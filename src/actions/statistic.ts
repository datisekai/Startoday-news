import axiosClient from "../axios/axiosClient";

const statisticAPI = {
  dashboard: async () => {
    const res = await axiosClient.get("/thong-ke");
    return res.data.data;
  },
};

export default statisticAPI;
