import {axiosInstance} from '../../network/apis';

const getCafeListRequest = async (params) => {
   let myApi = `/cafes`;
  if (params?.data) {
    myApi += `?location=${params.data}`;
  }
  return await axiosInstance.get(myApi);
};

const addCafeRequest = async (params) => {
  return await axiosInstance.post(`/cafe`, params.data, { headers: {'Content-Type': 'multipart/form-data'}});
};

const updateCafeRequest = async (params) => {
  return await axiosInstance.put(`/cafe/${params.id}`, params.data, { headers: {'Content-Type': 'multipart/form-data'}});
};

const removeCafeRequest = async (params) => {
  return await axiosInstance.delete(`/cafe/${params.id}`);
};

export default {
    getCafeListRequest,
    addCafeRequest,
    updateCafeRequest,
    removeCafeRequest
};
