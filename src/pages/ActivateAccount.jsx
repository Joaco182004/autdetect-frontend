import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivateAccount = ({ match }) => {
  const [message, setMessage] = useState('Verificando...');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const activationKey = match.params.activation_key;
        await axios.get(`http://localhost:8000/activate/${activationKey}`);
        setMessage('Cuenta activada con éxito. Puedes iniciar sesión.');
      } catch (error) {
        setMessage('Error al activar la cuenta. El enlace puede haber expirado o ser inválido.');
      }
    };

    activateAccount();
  }, [match.params.activation_key]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default ActivateAccount;
