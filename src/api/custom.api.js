import axios from "axios";
import { API_BASE_URL } from "../config";
export const getQuestionnaireOrderByMonth = (year) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      year: year,
    },
  };
  return axios.get(`${API_BASE_URL}/autdetect/api/v1/patients_by_month/`, config);
};
export const getQuestionnaireOrderByMonthAutism = (year) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      year: year,
    },
  };
  return axios.get(`${API_BASE_URL}/autdetect/api/v1/patients_by_month_autism/`, config);
};
export const getPatientsByGender = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.get(`${API_BASE_URL}/autdetect/api/v1/patients_by_gender/`, config);
};
export const getYearsEvaluation = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.get(`${API_BASE_URL}/evaluation-years/`, config);
}
export const sendEmailChange = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/changeemail/`, change, config);
};
export const changeUsername = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/changeusername/`, change, config);
};
export const changePassword = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/changepassword/`, change, config);
};
export const changePasswordEmail = (email) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/changepasswordemail/`, email, config);
};
export const validateCode = (code) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/validatecode/`, code, config);
};
export const sendEmailReport = (content) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(`${API_BASE_URL}/reporte/`, content, config);
};
export const predictModelDiagnosis = (content) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return axios.post(`${API_BASE_URL}/model/`, content, config);
};
export const downloadPatients = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem('idPsychology');
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob",
  };
  return axios
    .get(`${API_BASE_URL}/export-infant-patients/${id}/`, config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_pacientes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("Error al descargar el archivo:", error);
    });
};
export const downloadEvaluations = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem('idPsychology')
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob",
  };
  return axios
    .get(`${API_BASE_URL}/export-questionnaires/${id}/`, config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_evaluaciones.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("Error al descargar el archivo:", error);
    });
};
export const downloadPersonalEvaluation = (content,name) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob",
  };
  return axios
    .post(`${API_BASE_URL}/export-evaluation/`, content, config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `AutDetect_Evaluación_${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("Error al descargar el archivo:", error);
    });
};
