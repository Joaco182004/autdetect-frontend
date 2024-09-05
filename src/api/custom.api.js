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
export const getQuestionnaireOrderByMonthAutism= (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`http://localhost:8000/autdetect/api/v1/patients_by_month_autism/`, config);
}
export const getPatientsByGender = () => {    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get('http://localhost:8000/autdetect/api/v1/patients_by_gender/', config);
}
export const sendEmailChange = (change) => {    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.post('http://localhost:8000/changeemail/',change,config);
}
export const changeUsername = (change) => {    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.post('http://localhost:8000/changeusername/',change,config);
}
export const changePassword = (change) => {    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.post('http://localhost:8000/changepassword/',change,config);
}