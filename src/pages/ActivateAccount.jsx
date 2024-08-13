import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const [message, setMessage] = useState('Verificando...');
  const { activation_key } = useParams(); // Obtén el parámetro de la URL

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.get(`http://localhost:8000/activate/${activation_key}`);
        setMessage('Cuenta activada con éxito. Puedes iniciar sesión.');
      } catch (error) {
        setMessage('Error al activar la cuenta. El enlace puede haber expirado o ser inválido.');
      }
    };

    if (activation_key) {
      activateAccount();
    }
  }, [activation_key]); // Agrega `activation_key` como dependencia

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default ActivateAccount;
