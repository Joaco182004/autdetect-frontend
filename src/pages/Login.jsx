import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import img_login from "../assets/under-il.svg";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api/authorization.api.js";
function Login() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
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
  const [msg, setMsg] = useState(
    "Inicie sesión para iniciar los diagnósticos de pacientes."
  );

  const handleKeyDown = (event) => {
   
    if (event.key === 'Enter') {
      if(loginEmail.length >  0 && loginPassword.length>0){
        validateLogin()
      }
      // Aquí puedes agregar la lógica para iniciar sesión o cualquier otra acción deseada
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewLogin) {
      validateLogin();
      console.log("Hola");
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
        setViewLogin(true);
      })
      .catch((error) => {
        console.error("Error in saveUser function:", error);
      });
  };
  const validateLogin = () => {
    const userLogin = {
      username: loginEmail,
      password: loginPassword,
    };
    login(userLogin)
      .then((response) => {
        console.log(response);
        setErrorLogin(false);
        setTextErrorLogin("!Bienvenido a la plataforma Autdetect!.");
        navigate("/app/dashboard");
      })
      .catch((error) => {
        setErrorLogin(true);
        setTextErrorLogin("Las creedenciales ingresadas son incorrectas.");
      });
  };
  const validate = () => {
    let errors = {};

    if (!name) {
      errors.name = "El campo es obligatorio";
    }
    if (!dni) {
      errors.dni = "El campo es obligatorio";
    } else if (dni.length !== 8) {
      errors.dni = "El DNI debe tener 8 dígitos";
    }
    if (!numeroColegiatura) {
      errors.numeroColegiatura = "El campo es obligatorio";
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
    <section className="bg-[rgb(142,173,219)] w-screen h-screen flex justify-center items-center">
      <section className="bg-[rgb(240,243,250)] w-screen h-screen max-w-[1500px] rounded-md max-h-[900px] flex flex-row ">
        <div className=" w-[50%] h-full relative flex items-center flex-col justify-around">
          <div className="text-center">
            <h1 className="font-black font-playwrite text-4xl mb-1">
              ¡Bienvenido a <span className="text-blue-500">AutDetect</span>!
            </h1>
            <p className="font-montserrat mt-4">{msg}</p>
          </div>

          <img
            className="w-[500px] h-[420px] select-none"
            src={img_login}
          ></img>
        </div>
        <div className="w-[50%] h-full flex items-center justify-center">
          <div className="bg-white w-[420px] h-auto rounded-md p-4 pb-1">
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
                      onChange={(e)=>setLoginEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="font-montserrat w-full p-2.5 border bg-[rgb(240,243,250)] rounded-lg outline-0 text-gray-700"
                    />
                  </div>
                  <div
                    className="mb-8"
                    style={{ width: `${widthInput}px`, height: `${40}px` }}
                  >
                    <div className="flex items-center justify-between">
                      <label className="uppercase block font-montserrat text-[rgb(175,185,200)] text-xs font-text mb-1">
                      Contraseña
                      </label>
                      
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e)=>setLoginPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="font-montserrat w-full p-2.5 border bg-[rgb(240,243,250)] rounded-lg outline-0 text-gray-700"
                    />
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
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Login;
