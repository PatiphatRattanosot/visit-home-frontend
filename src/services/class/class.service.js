import api from "../api";

const createClass = async (data) => {
  return await api.post("class/", data);
};

const updateClass = async (data) => {
  return await api.put("class/", data);
};

const getClassroomsByYear = async (year_id) => {
  return await api.get(`class/by_year/${year_id}`);
};

//เรียกข้อมูลผ่าน body
const getClassesByTeacherId = async (teacherId, yearId ) => {
  return await api.post(`class/by_teacher`, {
    teacher_id: teacherId,
    year_id: yearId
  });
};

const getClassById = async (id) => {
  return await api.get(`class/by_id/${id}`);
};

const deleteClass = async (id) => {
  return await api.delete("class/", { data: { class_id: id } });
};

const classService = {
  createClass,
  updateClass,
  getClassroomsByYear,
  getClassById,
  deleteClass,
  getClassesByTeacherId
};

export default classService;
