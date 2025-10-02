import sign from "jwt-encode";

export const authEncode = (data) => {
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  return sign(data, secretKey, { expiresIn: "1h" });
};
