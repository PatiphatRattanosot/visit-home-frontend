import api from "../api";

const addVisitInfo = async (data) => {
  return await api.post("visit-info/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getVisitInfoById = async (id) => {
  return await api.get(`/visit-info/by_id/${id}`);
};

const getVisitInfoByStudentId = async (studentId, yearId) => {
  return await api.post("/visit-info/by_student", {
    student_id: studentId,
    year_id: yearId,
  });
};

const updateVisitInfo = async (data) => {
  return await api.put(`/visit-info/update`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const VisitInfoService = {
  updateVisitInfo,
  addVisitInfo,
  getVisitInfoById,
  getVisitInfoByStudentId,
};

export default VisitInfoService;
