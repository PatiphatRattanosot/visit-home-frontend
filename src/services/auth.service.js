import api from "./api";

const sign = async (token) => {
  return await api.post(`/auth/sign`, { access_token: token });
};

const signOut = async () => {
  return await api.post(`/auth/sign-out`);
};

const AuthServices = {
  sign,
  signOut,
};

export default AuthServices;
