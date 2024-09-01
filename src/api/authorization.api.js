import axios from "axios";

export const register = (user) => {
    return axios.post('http://localhost:8000/register/', user)
        .then(response => {
            console.log("Registration successful", response.data);
        })
};
export const login = (userLogin) =>{
    return axios.post('http://localhost:8000/login/', userLogin)
        .then(response => {
            console.log("Login successful", response.data);
            localStorage.setItem('token',response.data.token)
        })
      
}