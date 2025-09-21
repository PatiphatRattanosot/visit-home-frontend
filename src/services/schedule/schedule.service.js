import api from "../api";

const baseUrl = "/schedule";

const createSchedule = async (data) => {
  return await api.post(`${baseUrl}/create`, data);
};

const deleteSchedule = async (id) => {
  return await api.delete(`${baseUrl}/delete/${id}`);
};

const getSchedule = async (teacherId, yearId, studentId) => {
  return await api.post(`${baseUrl}/get_schedule`, {
    teacher_id: teacherId,
    year_id: yearId,
    student_id: studentId,
  });
};

const updateSchedule = async (data) => {
  return await api.put(`${baseUrl}/update`, data);
};

const ScheduleServices = {
  createSchedule,
  deleteSchedule,
  getSchedule,
  updateSchedule,
};

export default ScheduleServices;
