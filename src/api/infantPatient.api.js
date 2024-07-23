import axios from "axios"

export const getAllPatients = () => {    
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return axios.get('http://localhost:8000/autdetect/api/v1/infantpatient/', config);
}

export const getPatientById = (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    };
    return axios.get(`http://localhost:8000/autdetect/api/v1/infantpatient/${id}/`, config);
}

export const savePatient = (patient) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
            
        }
    };
    return axios.post('http://localhost:8000/autdetect/api/v1/infantpatient/',patient, config);
}
export const savePatientById = (id,patient) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
                    }
    };
    return axios.put(`http://localhost:8000/autdetect/api/v1/infantpatient/${id}/`,patient, config);
}
