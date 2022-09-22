import axios from "axios";

// created axios instance with base url so we dont have to provide the url whereever using axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  // timeout: 1000,
});