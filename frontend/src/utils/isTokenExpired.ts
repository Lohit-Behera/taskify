import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const decoded: {
      token_type: string;
      exp: number;
      iat: number;
      jti: string;
      user_id: string;
    } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (err) {
    console.log(err);
    return true;
  }
};
