import sign from "jwt-encode";

export const authEncode = (data) => {
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("VITE_SECRET_KEY environment variable is not set");
  }

  // Add expiration claim to payload (1 hour from now)
  const payload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  };

  try {
    return sign(payload, secretKey);
  } catch (error) {
    throw new Error(`Failed to encode JWT: ${error.message}`);
  }
};
