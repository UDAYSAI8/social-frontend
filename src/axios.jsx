import axios from "axios";

const axiosInstance = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://social-backend-1-rpl3.onrender.com/",
    // baseURL: "https://social-backend-chi.vercel.app/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export default axiosInstance;
