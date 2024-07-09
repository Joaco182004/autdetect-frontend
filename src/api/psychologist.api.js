import axios from "axios"

export const getAllPsychologist = () => {
    // Obtener el token del almacenamiento local
    // const token = localStorage.getItem('token');

    // Configurar los encabezados de la solicitud
    const config = {
        headers: {
            'Authorization': `Token ${'133a1844604f71ac1cfd094bf2ec2e621b52e4dc'}`
        }
    };

    // Hacer la solicitud GET con el encabezado de autorización
    return axios.get('http://localhost:8000/psychologist/api/v1/psychologist', config);
}
