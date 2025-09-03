import api from "../api";

const getAllStudentInclass = async () => {
  return await api.get("/users/student");
};

const addVisitInfo = async (data) => {
  return await api.post("/visitinfo", data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const TeacherService = {
  getAllStudentInclass,
  addVisitInfo,
};

export default TeacherService;
