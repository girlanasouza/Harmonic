import { Login, Signup } from "../types/user.type";
import api from "./api";

export const userAuthLogin = async (dataLogin: Login) => {
  try {
    const response = await api.post("/authentication/login", dataLogin);
    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const userAuthsignup = async (dataRegister: Signup) => {
  try {
    const response = await api.post("/authentication/signup", dataRegister);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const userAuthlogout = async () => {
  try {
    const response = await api.post("/authentication/logout");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const checkSession = async () => {
  try {
    const response = await api.post("/authentication/check");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
