import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});

export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/profile", data);
  return res.data;
};
