import api from "../api";

const baseUrl = "/users/student";

const getAllStudents = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2806f634ee5e68113af2822c700f6588a8b28896
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
<<<<<<< HEAD
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
=======
  return await api.get(`${baseUrl}/students`);
=======
  return await api.get(`${baseUrl}`);
>>>>>>> 2f183ef (Edit table in student list page)
};

const createStudent = async (data) => {
  return await api.post(`${baseUrl}`, data);
};

const getStudentById = async (id) => {
  return await api.get(`${baseUrl}/${id}`);
};

const updateStudent = async (id, data) => {
<<<<<<< HEAD
  return await api.put(`${baseUrl}/students/${id}`, data);
>>>>>>> bbd2882 (Debug student update imports and API endpoints in StudentList and StudentService)
=======
  return await api.put(`${baseUrl}/${id}`, data);
>>>>>>> 2f183ef (Edit table in student list page)
=======
>>>>>>> 2806f634ee5e68113af2822c700f6588a8b28896
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
