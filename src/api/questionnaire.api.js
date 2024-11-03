import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAllQuestionnaire = () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get(`${API_BASE_URL}/autdetect/api/v1/questionnaire/`, config);
};

export const saveQuestionnaire = (questionnaire) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.post(`${API_BASE_URL}/autdetect/api/v1/questionnaire/`, questionnaire, config);
};

export const getQuestionnaireById = (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`${API_BASE_URL}/autdetect/api/v1/questionnaire/${id}/`, config);
};
