import axiosClient from "../axios/axiosClient";

const SearchAPI = {
  searchNews: async (
    data: { text?: string; category?: string },
    page = 1,
    limit = 5
  ) => {
    let query = "";
    if (data.text) {
      query = data.category
        ? `/tim-kiem?text=${data.text}&category=${data.category}`
        : `/tim-kiem?text=${data.text}`;
    } else {
      query = data.category ? `/tim-kiem?category=${data.category}` : "";
    }
    const res = await axiosClient.get(`${query}&page=${page}&limit=${limit}`);
    return res.data;
  },
};

export default SearchAPI;
