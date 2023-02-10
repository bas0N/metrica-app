import { RegisterUserDto } from "./dto/registerUser.dto";
import axios from "axios";
import { LoginUserDto } from "./dto/loginUser.dto";
const API_URL = "";

export const register = async (user: RegisterUserDto) => {
  console.log(user);
  console.log("auth service -> register");
  const response = await axios.post(
    process.env.BACKEND_URL + "/auth/register",
    user
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const login = async (credentials: LoginUserDto) => {
  console.log(credentials);
  const response = await axios.post(
    process.env.BACKEND_URL + "/auth/login",
    credentials
  );
  if (response.data) {
    //set this to local storage
    localStorage.setItem("a_t", JSON.stringify(response.data.access_token));
  }
  //get me and return it
  return response.data;
};

export const authService = { register, logout, login };
