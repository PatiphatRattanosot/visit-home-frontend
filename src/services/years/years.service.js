import api from "../api";

const createYear = async (data) => {
  return await api.post("/year/", data);
};

const createYearAuto = async () => {
  // เส้นนี้ไม่ต้องมี data เพราะ backend จัดการให้เอง
  return await api.post("/year/auto");
};

const getYears = async () => {
  return await api.get("/year/");
};

//params
const getYearsByYear = async (year) => {
  return await api.get(`/year/${year}`);
};

const updateYear = async (data) => {
  return await api.put("/year/", data);
};

//body
const deleteYear = async (id) => {
  return await api.delete("/year", { data: { year_id: id } });
};

const addSchedulesToYear = async (data) => {
  return await api.patch("/year/add-schedule", data);
};

const YearServices = {
  createYear,
  createYearAuto,
  getYears,
  updateYear,
  deleteYear,
  getYearsByYear,
  addSchedulesToYear,
};

export default YearServices;
