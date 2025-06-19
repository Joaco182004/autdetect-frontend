import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import img_login from "../assets/under-il.svg";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api/authorization.api.js";
import { getAllPsychologist } from "../api/psychologist.api.js";
import { ToastContainer, toast } from "react-toastify";
import {EyeFilledIcon} from '../assets/EyeFilledIcon.jsx'
import {EyeSlashFilledIcon} from '../assets/EyeSlashFilledIcon.jsx'
import "react-toastify/dist/ReactToastify.css";
function Login() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [visiblePassword,setVisiblePassword] = useState(false);
  const [dni, setDni] = useState("");
  const [numeroColegiatura, setNumeroColegiatura] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [widthInput, setWidthInput] = useState(380);
  const [viewLogin, setViewLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [textErrorLogin, setTextErrorLogin] = useState("");
  const [psychologist, setPsychologist] = useState([]);
  const [typeInputPassword,setTypeInputPassword] = useState("password");
  const [msg, setMsg] = useState(
    "Inicie sesión para iniciar los diagnósticos de pacientes."
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (loginEmail.length > 0 && loginPassword.length > 0) {
        validateLogin();
      }
      // Aquí puedes agregar la lógica para iniciar sesión o cualquier otra acción deseada
    }
  };
  async function getPsychologist() {
    const res = await getAllPsychologist();
    setPsychologist(res.data);
  }
  function handleResize(){
    const width = window.innerWidth;
    if(width < 450){
      setWidthInput(300)
    }
  }
  const limpiarSesion = () => {
    localStorage.clear();
  };
  useEffect(() => {
    handleResize();
    limpiarSesion();
    // Añadir event listener para el cambio de tamaño
    window.addEventListener('resize', handleResize);
    
    getPsychologist();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewLogin) {
      validateLogin();
    } else {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
        saveUser();
        setDni("");
        setEmail("");
        setNumeroColegiatura("");
        setPassword("");
        setName("");
      } else {
        setErrors(validationErrors);
      }
    }
  };
  const changeView = (e) => {
    e.preventDefault();
    setViewLogin(!viewLogin);
    if (!viewLogin) {
      setMsg("Inicie sesión para iniciar los diagnósticos de pacientes.");
    } else {
      setMsg("Crea un usuario para ayudar a niños con su diagnóstico.");
    }
  };
  const saveUser = () => {
    const user = {
      password: password,
      email: email,
      full_name: name,
      dni: dni,
      tuition_number: numeroColegiatura,
    };
    register(user)
      .then(() => {
        toast.success(
          "Usuario registrado. Por favor valide su cuenta mediante correo.",
          {
            position: "bottom-center",
            style: {
              width: 500,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          }
        );
        setViewLogin(true);
      })
      .catch((error) => {
        
        toast.error(
            error.response.data.errors.join(", ") + ".",
          {
            position: "bottom-center",
            style: {
              width: 450,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          }
        );
      });
  };
  const validateLogin = () => {
    if (loginEmail == "" || loginPassword == "") {
      toast.error("Los campos de correo y contraseña estan vacíos.", {
        position: "bottom-center",
        style: {
          width: 410,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      const userLogin = {
        username: loginEmail,
        password: loginPassword,
      };
      login(userLogin)
        .then((response) => {
          psychologist.map((e) => {
            if (e.email == userLogin.username) {
              localStorage.setItem("idPsychology", e.id);
            }
          });
          toast.success("!Bienvenido a la plataforma Autdetect!.", {
            position: "bottom-center",
            style: {
              width: 410,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
          navigate("/app/dashboard");
        })
        .catch((error) => {
          toast.error(error.response.data.error, {
            position: "bottom-center",
            style: {
              width: 350,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
        });
    }
  };
  const validate = () => {
    let errors = {};

    if (!name) {
      errors.name = "El campo es obligatorio";
    } else if (/\d/.test(name)) {
      errors.name = "El nombre no debe contener números";
    }
    if (!dni) {
      errors.dni = "El campo es obligatorio";
    } else if (dni.length !== 8) {
      errors.dni = "El DNI debe tener 8 dígitos";
    }
    if (!numeroColegiatura) {
      errors.numeroColegiatura = "El campo es obligatorio";
    }else if (numeroColegiatura.length != 5) {
      errors.numeroColegiatura = "El campo debe tener 5 dígitos";
    }
    if (!email) {
      errors.email = "El campo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo no es válido";
    }
    if (!password) {
      errors.password = "El campo es obligatorio";
    } else if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "La contraseña debe tener una letra mayúscula";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "La contraseña debe tener un carácter especial";
    }

    return errors;
  };

  return (
    <section className="bg-[rgba(134,185,221,0.5)] w-screen h-screen flex justify-center items-center">
      <section className="bg-[rgb(240,243,250)] w-screen h-screen max-w-[1500px] rounded-md max-h-[900px] flex flex-row ">
        <div className=" w-[50%] h-full relative  items-center flex-col justify-around hidden lg:flex">
          <div className="text-center">
            <h1 className="font-black font-playwrite text-4xl mb-1 ">
              ¡Bienvenido a <span className="text-blue-500">AutDetect</span>!
            </h1>
            <p className="font-montserrat mt-4">{msg}</p>
          </div>

          <img
            className="w-[500px] h-[420px] select-none"
            src={img_login}
          ></img>
        </div>
        <div className="lg:w-[50%] h-full flex flex-col items-center justify-center w-full">
        <div className="mb-20 lg:hidden max-h-849:mb-10 ">
        <h1 className="font-black font-playwrite text-4xl max-w-530:text-3xl max-w-430:text-2xl text-center max-h-800:mt-4">
              ¡Bienvenido a <span className="text-blue-500">AutDetect</span>!
              
            </h1>
            <p className="font-montserrat mt-4 text-center">{msg}</p>
        </div>
         

          <div className="bg-white w-[420px] max-w-450:w-[340px] h-auto rounded-md p-4 pb-1 mb-2">
            {!viewLogin && (
              <>
                <h2 className="font-montserrat font-semibold mb-3 text-3xl">
                  Registro de Usuario
                </h2>
                <form className="w-full flex flex-col justify-center items-center">
                  <Input
                    width={widthInput}
                    type="text"
                    label="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                  />
                  <Input
                    width={widthInput}
                    type="number"
                    label="Número de DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    error={errors.dni}
                  />
                  <Input
                    width={widthInput}
                    type="number"
                    label="Número de colegiatura"
                    value={numeroColegiatura}
                    onChange={(e) => setNumeroColegiatura(e.target.value)}
                    error={errors.numeroColegiatura}
                  />
                  <Input
                    width={widthInput}
                    type="email"
                    label="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    width={widthInput}
                    type="password"
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                  />
                  <Button
                    type={"primary"}
                    description={"Registrarme"}
                    width={widthInput}
                    height={40}
                    onClick={handleSubmit}
                  ></Button>
                  <Button
                    description={"Iniciar Sesión"}
                    width={widthInput}
                    height={40}
                    onClick={changeView}
                  ></Button>
                </form>
              </>
            )}
            {viewLogin && (
              <>
                <h1 className="font-montserrat font-semibold mb-3 text-3xl">
                  Iniciar Sesión
                </h1>
                <form className="w-full flex flex-col justify-center items-center">
                  <div
                    className="mb-8"
                    style={{ width: `${widthInput}px`, height: `${40}px` }}
                  >
                    <div className="flex items-center justify-between">
                      <label className="uppercase block font-montserrat text-[rgb(175,185,200)] text-xs font-text mb-1">
                        Correo electrónico
                      </label>
                    </div>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="font-montserrat w-full p-2.5 border bg-[rgb(240,243,250)] rounded-lg outline-0 text-gray-700"
                    />
                  </div>
                  <div
                    className="mb-8"
                    style={{ width: `${widthInput}px`, height: `${40}px` }}
                  >
                    <div className="flex items-center justify-between relative">
                      <label className="uppercase block font-montserrat text-[rgb(175,185,200)] text-xs font-text mb-1">
                        Contraseña
                      </label>
                    </div>
                    <div className="relative w-auto h-auto">
                    <input
                      type={typeInputPassword}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="font-montserrat w-full p-2.5 border bg-[rgb(240,243,250)] rounded-lg outline-0 text-gray-700"
                      
                    />
                    {!visiblePassword && (<button type="button" onClick={()=>{setVisiblePassword(true);setTypeInputPassword("text")}}><EyeFilledIcon  className="right-3 top-3 absolute text-2xl text-default-400 "></EyeFilledIcon></button>)}
                    {visiblePassword && (<button type="button" onClick={()=>{setVisiblePassword(false);setTypeInputPassword("password")}}><EyeSlashFilledIcon className="right-3 top-3 absolute text-2xl text-default-400"></EyeSlashFilledIcon></button>)}
                    </div>
                  </div>

                  <p
                    className={` text-xm mb-4 font-medium ${
                      errorLogin ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {textErrorLogin}
                  </p>
                  <Button
                    type={"primary"}
                    description={"Iniciar Sesión"}
                    width={widthInput}
                    height={40}
                    onClick={handleSubmit}
                  ></Button>
                  <Button
                    description={"Registrarme"}
                    width={widthInput}
                    height={40}
                    onClick={changeView}
                  ></Button>
                  <a
                    onClick={() => {
                      navigate("/changepassword");
                    }}
                    className="font-montserrat cursor-pointer mb-2 text-blue-500 underline select-none"
                  >
                    ¿Te olvidaste tu contraseña?
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      <ToastContainer className="font-montserrat !important" />
    </section>
  );
}

export default Login;
