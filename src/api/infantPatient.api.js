import axios from "axios"

export const getAllPatients = () => {
    
    const token = localStorage.getItem('token');

    // Configurar los encabezados de la solicitud
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    // Hacer la solicitud GET con el encabezado de autorización
    return axios.get('http://localhost:8000/autdetect/api/v1/infantpatient/', config);
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
