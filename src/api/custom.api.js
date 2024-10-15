import axios from "axios";

export const getQuestionnaireOrderByMonth = (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return axios.get(
    `http://localhost:8000/autdetect/api/v1/patients_by_month/`,
    config
  );
};
export const getQuestionnaireOrderByMonthAutism = (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return axios.get(
    `http://localhost:8000/autdetect/api/v1/patients_by_month_autism/`,
    config
  );
};
export const getPatientsByGender = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.get(
    "http://localhost:8000/autdetect/api/v1/patients_by_gender/",
    config
  );
};
export const sendEmailChange = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post("http://localhost:8000/changeemail/", change, config);
};
export const changeUsername = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post("http://localhost:8000/changeusername/", change, config);
};
export const changePassword = (change) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post("http://localhost:8000/changepassword/", change, config);
};
export const changePasswordEmail = (email) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post(
    "http://localhost:8000/changepasswordemail/",
    email,
    config
  );
};
export const validateCode = (code) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post("http://localhost:8000/validatecode/", code, config);
};
export const sendEmailReport = (content) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return axios.post("http://localhost:8000/reporte/", content, config);
};
export const predictModelDiagnosis = (content) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return axios.post("http://localhost:8000/model/", content, config);
};
export const downloadPatients = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob",
  };
  return axios
    .get("http://localhost:8000/export-infant-patients/", config)
    .then((response) => {
      // Crear un blob a partir de la respuesta del servidor
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_pacientes.xlsx"); // Puedes cambiar el nombre del archivo

      // Añadir el enlace temporal al DOM y simular el clic para descargar
      document.body.appendChild(link);
      link.click();

      // Eliminar el enlace temporal del DOM
      link.remove();
    })
    .catch((error) => {
      console.error("Error al descargar el archivo:", error);
    });
};
export const downloadEvaluations = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob",
  };
  return axios.get("http://localhost:8000/export-questionnaires/", config).then((response) => {
    // Crear un blob a partir de la respuesta del servidor
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reporte_evaluaciones.xlsx"); // Puedes cambiar el nombre del archivo

    // Añadir el enlace temporal al DOM y simular el clic para descargar
    document.body.appendChild(link);
    link.click();

    // Eliminar el enlace temporal del DOM
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
  return axios.post("http://localhost:8000/export-evaluation/", content,config).then((response) => {

    // Crear un blob a partir de la respuesta del servidor
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download","AutDetect_Evaluación_"+name+".pdf"); // Puedes cambiar el nombre del archivo

    // Añadir el enlace temporal al DOM y simular el clic para descargar
    document.body.appendChild(link);
    link.click();

    // Eliminar el enlace temporal del DOM
    link.remove();
  })
  .catch((error) => {
    console.error("Error al descargar el archivo:", error);
  });
};
