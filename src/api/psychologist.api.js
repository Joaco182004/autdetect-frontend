import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAllPsychologist = () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get(`${API_BASE_URL}/autdetect/api/v1/psychologist/`, config);
};

export const getPsychologistById = () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('idPsychology');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`${API_BASE_URL}/autdetect/api/v1/psychologist/${id}/`, config);
};
