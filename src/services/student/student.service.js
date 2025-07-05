import api from "../api";

const baseUrl = "/users/student";

const getAllStudents = async () => {
  return await api.get(`${baseUrl}/students`);
};

const createStudent = async (data) => {
  return await api.post(`${baseUrl}/students`, data);
};

const getStudentById = async (id) => {
  return await api.get(`${baseUrl}/students/${id}`);
};

const updateStudent = async (id, data) => {
  return await api.put(`${baseUrl}/students/${id}`, data);
};

const StudentService = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
};

export default StudentService;
