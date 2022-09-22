import { axiosInstance } from "../../utils/axios";

//api request to fetch all cars data from server
export function getCarDataApi() {
  return axiosInstance
    .get('/')
    .then((response) => response.data);
}
