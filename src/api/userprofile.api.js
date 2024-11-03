import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAllUserProfile = () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get(`${API_BASE_URL}/autdetect/api/v1/userprofile/`, config);
};

export const getUserProfileById = () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('idPsychology');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`${API_BASE_URL}/autdetect/api/v1/userprofile/${id}/`, config);
};
