import { axiosInstance } from "../../utils/axios";

// ids=car1,car2....carn
export function getCompareCarsDataApi(ids) {
  return axiosInstance
    .get('/cars/compare-cars/?ids='+ids.payload)
    .then((response) => response.data);
}
