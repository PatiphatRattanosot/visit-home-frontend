import api from "./api";

const sign = async (email) => {
  return await api.post(`/auth/sign`, email);
};

const signOut = async () => {
  return await api.post(`/auth/sign-out`);
};

const AuthServices = {
  sign,
  signOut,
};

export default AuthServices;
