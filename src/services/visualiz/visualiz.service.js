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

const VisualizServices = {
  getVisualiz_total_role,
  getVisualiz_total_status,
  getVisualiz_total_visitor,
};
export default VisualizServices;
