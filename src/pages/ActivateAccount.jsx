import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/react";
import imgSad from "../assets/sad.png";
import imgHappy from "../assets/happy.png";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
const ActivateAccount = () => {
  const [message, setMessage] = useState("Verificando...");
  const { activation_key } = useParams(); // Obtén el parámetro de la URL
  const [hasActivated, setHasActivated] = useState(false);
  const [image,setImage] =useState("")
  const [msg,setMsg] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (activation_key && !hasActivated) {
      const activateAccount = async () => {
        try {
          await axios.get(`http://localhost:8000/activate/${activation_key}`);
          setMessage("Cuenta activada con éxito. Puedes iniciar sesión.");
          setHasActivated(true);
          setImage(imgHappy)
          setMsg("El proceso se ha completado correctamente")
        } catch (error) {
          setImage(imgSad)
          setMsg("Parece haber ocurrido un error")
          setMessage(
            "Error al activar la cuenta. El enlace puede haber expirado o ser inválido."
          );
          setHasActivated(true);
        }
      };
      activateAccount();
    }
  }, [activation_key]);

  return (
    <div className="bg-[rgba(134,185,221,0.5)] flex justify-center items-center w-screen h-screen">
      <div className=" flex w-[700px] h-[400px] bg-white rounded-md items-center">
        <div className="w-[35%] h-[100%] flex bg-blue-500 items-center justify-center">
          <h1 className="font-bold text-3xl  text-white font-playwrite">
            AutDetect
          </h1>
        </div>
        <Divider orientation="vertical" />
        <div className=" w-[65%] h-[90%] flex flex-col justify-around items-center px-4">
          <h1 className="text-2xl text-center font-montserrat font-semibold  text-blue-500">
            {msg}
          </h1>
          <div className="flex w-full justify-center items-center">
            <img className="w-36" src={image}></img>
            <p className="ml-4 font-montserrat text-md text-blue-500">
              {message}
            </p>
          </div>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="font-montserrat font-semibold w-96"
            color="primary"
          >
            Regresar al Inicio de Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
