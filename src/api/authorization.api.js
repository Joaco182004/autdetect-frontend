import axios from "axios";

export const register = (user) => {
    return axios.post('http://localhost:8000/register/', user)
        .then(response => {
            console.log("Registration successful", response.data);
        })
        .catch(error => {
            console.error("There was an error registering the user!", error);
        });
};
export const login = (userLogin) =>{
    return axios.post('http://localhost:8000/login/', userLogin)
        .then(response => {
            console.log("Login successful", response.data);
            localStorage.setItem('token',response.data.token)
        })
        .catch(error => {
            console.error("There was an error login the user!", error);
        });
}