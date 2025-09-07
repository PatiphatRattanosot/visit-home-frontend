import api from "../api";

const baseUrl = "/sdq";

const createSDQ = async (data) => {
  return await api.post(`${baseUrl}`, data);
};

const deleteSDQ = async (data) => {
  return await api.delete(`${baseUrl}`, data);
};

const getSDQByYearAndAssessor = async (data) => {
  return await api.post(`${baseUrl}/by-student-year`, data);
};

const SDQServices = {
  createSDQ,
  deleteSDQ,
  getSDQByYearAndAssessor,
};

export default SDQServices;
