import { axiosInstance } from "../../utils/axios";

//api request to fetch single car data from server
export function getCarDetailsApi(id) {
  return axiosInstance
    .get(id)
    .then((response) => response.data);
}

//api request to add feedback
export function addFeedback(reqObj) {
  return axiosInstance.post('/feedback/add/' + reqObj.id, reqObj.body).then((response) => response.data);
}

//api request to remove feedback
export function removeFeedback(reqObj) {
  return axiosInstance.post('/feedback/remove/' + reqObj.id, reqObj.body).then((response) => response?.data);
}