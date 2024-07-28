import axios from "axios"

export const getAllQuestionnaire = () => {
    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get('http://localhost:8000/autdetect/api/v1/questionnaire/', config);
}
export const saveQuestionnaire = (questionnaire) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
            
        }
    };
    return axios.post('http://localhost:8000/autdetect/api/v1/questionnaire/',questionnaire, config);
}
