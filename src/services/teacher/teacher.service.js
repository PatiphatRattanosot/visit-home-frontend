import api from "../api";

const getAllStudentInclass = async () => {
    return await api.get("/studentlist");
};

const addVisitInfo = async (data) => {
    return await api.post("/visitinfo", data);
};

const TeacherService = {
    getAllStudentInclass,
    addVisitInfo,
}

export default TeacherService;
