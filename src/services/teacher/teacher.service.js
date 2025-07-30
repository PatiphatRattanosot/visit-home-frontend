import api from "../api";

const getAllStudentInclass = async () => {
  return await api.get("/users/student/students");
};

const addVisitInfo = async (data) => {
  return await api.post("/visitinfo", data);
};

const TeacherService = {
  getAllStudentInclass,
  addVisitInfo,
};

export default TeacherService;
