import axios from "axios";

const axiosUpload = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_UPLOAD_NAME}/image/upload`,
});

export default axiosUpload;
