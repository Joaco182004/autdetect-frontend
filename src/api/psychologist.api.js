import axios from "axios"
export const getAllPsychologist = () =>{
    return axios.get('http://localhost:8000/psychologist/api/v1/psychologist')
}