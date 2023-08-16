import {axiosInstance} from '../../network/apis';

const getEmployeeRequest = async (params) => {
  let myApi = `/employee/${params.data}`;
  return await axiosInstance.get(myApi);
};

const getEmployeeListRequest = async (params) => {
  let myApi = `/employees`;
  if (params?.data) {
    myApi += `?cafe=${params.data}`;
  }
  return await axiosInstance.get(myApi);
};

const addEmployeeRequest = async (params) => {
  return await axiosInstance.post(`/employee`, params.data);
};

const updateEmployeeRequest = async (params) => {
  return await axiosInstance.put(`/employee/${params?.data?.id}`, params?.data);
};

const removeEmployeeRequest = async (params) => {
  return await axiosInstance.delete(`/employee/${params.id}`);
};

export default {
    getEmployeeRequest,
    getEmployeeListRequest,
    addEmployeeRequest,
    updateEmployeeRequest,
    removeEmployeeRequest
};
