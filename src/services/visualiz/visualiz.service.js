import api from "../api";

const getVisualiz_total_role = async () => {
  return await api.get(`/show-all-user`);
};
const getVisualiz_total_status = async () => {
  return await api.get(`/show-teacher-status`);
};
const getVisualiz_total_visitor = async () => {
  return await api.get(`/show-visit-info-status`);
};
const getVisualiz_visit_status = async () => {
  return await api.get(`/show-student-visit-status`);
};
const getVisualiz_sdq_status = async () => {
  return await api.get(`/show-sdq-status`);
};
const getVisualiz_teacher_students_analytics = async () => {
  return await api.get(`/teacher-students-analytics`);
};

const VisualizServices = {
  getVisualiz_total_role,
  getVisualiz_total_status,
  getVisualiz_total_visitor,
  getVisualiz_visit_status,
  getVisualiz_sdq_status,
  getVisualiz_teacher_students_analytics,
};
export default VisualizServices;
