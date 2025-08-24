import api from "../api";

const createYear = async (data) => {
  return await api.post("/year/", data);
};

const createYearAuto = async (data) => {
  return await api.post("/year/auto", data);
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

const YearServices = {
  createYear,
  createYearAuto,
  getYears,
  updateYear,
  deleteYear,
  getYearsByYear,
};

export default YearServices;
