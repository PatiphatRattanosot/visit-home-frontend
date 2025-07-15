import api from "../api";

const baseUrl = "/users";

const getAllStudents = async () => {
  return await api.get(`${baseUrl}/student`);
};

const createStudent = async (data) => {
  return await api.post(`${baseUrl}/student`, data);
};

const getStudentById = async (id) => {
  return await api.get(`${baseUrl}/student/${id}`);
};

const updateStudent = async (id, data) => {
  return await api.put(`${baseUrl}/student/${id}`, data);
};

const StudentService = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
};

export default StudentService;
