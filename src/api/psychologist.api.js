import axios from "axios"

export const getAllPsychologist = () => {
    
    const token = localStorage.getItem('token');

    // Configurar los encabezados de la solicitud
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    // Hacer la solicitud GET con el encabezado de autorización
    return axios.get('http://localhost:8000/autdetect/api/v1/psychologist/', config);
}
