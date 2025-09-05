import api from "../api";

const addVisitInfo = async (data) => {
  return await api.post("/visit-info", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getVisitInfoById = async (id) => {
  return await api.get(`/visit-info/by_id/${id}`);
};

const getVisitInfoByStudentId = async (studentId, teacherId, yearId) => {
  return await api.post("/visit-info/by_student", {
    student_id: studentId,

    year_id: yearId,
  });
};

const VisitInfoService = {
  addVisitInfo,
  getVisitInfoById,
  getVisitInfoByStudentId,
};

export default VisitInfoService;
