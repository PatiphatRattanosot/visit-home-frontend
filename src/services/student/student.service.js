import api from "../api";

const baseUrl = "/users/student";

const getAllStudents = async () => {
  return await api.get(`${baseUrl}`);
};

const createStudent = async (data) => {
  return await api.post(`${baseUrl}`, data);
};

const getStudentById = async (id) => {
  return await api.get(`${baseUrl}/${id}`);
};

const updateStudent = async (id, data) => {
  return await api.put(`${baseUrl}/${id}`, data);
};

const yearlyData = async (data) => {
  return await api.put(`${baseUrl}/yearly`, data);
};

const getYearlyData = async (yearId) => {
  return await api.get(`${baseUrl}/by_year/${yearId}`);
};

const updateProfile = async (data) => {
  return await api.put(`${baseUrl}/profile-image`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const StudentService = {
  getAllStudents,
  createStudent,
  getStudentById,
  yearlyData,
  updateStudent,
  getYearlyData,
  updateProfile,
};

export default StudentService;
