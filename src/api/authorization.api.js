import axios from "axios";
import { API_BASE_URL } from "../config";

export const register = (user) => {
    return axios.post(`${API_BASE_URL}/register/`, user)
        .then(response => {
            console.log("Registration successful", response.data);
        })
};
export const login = (userLogin) =>{
    return axios.post(`${API_BASE_URL}/login/`, userLogin)
        .then(response => {
            console.log("Login successful", response.data);
            localStorage.setItem('token',response.data.token)
        })
      
}