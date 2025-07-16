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

const StudentService = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
};

export default StudentService;
