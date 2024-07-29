import axios from "axios";

export const getQuestionnaireOrderByMonth= (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`http://localhost:8000/autdetect/api/v1/patients_by_month/`, config);
}
