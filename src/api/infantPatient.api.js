import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAllPatients = () => {    
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };
    return axios.get(`${API_BASE_URL}/autdetect/api/v1/infantpatient/`, config);
};

export const getPatientById = (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`${API_BASE_URL}/autdetect/api/v1/infantpatient/${id}/`, config);
};

export const savePatient = (patient) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.post(`${API_BASE_URL}/autdetect/api/v1/infantpatient/`, patient, config);
};

export const savePatientById = (id, patient) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.put(`${API_BASE_URL}/autdetect/api/v1/infantpatient/${id}/`, patient, config);
};
