import axiosClient from "../axios/axiosClient";

const categoryAPI = {
  getCategory: () => {
    return axiosClient.get("/danh-muc");
  },
};

export default categoryAPI;
