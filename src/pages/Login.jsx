import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import img_login from "../assets/under-il.svg";
function Login() {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [numeroColegiatura, setNumeroColegiatura] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [widthInput,setWidthInput] = useState(380)
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      saveUser();
    } else {
      setErrors(validationErrors);
    }
    console.log(validationErrors);
  };
  const saveUser = () => {
    console.log("Usuario registrado con éxito");
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
    if(!confirmPassword){
        errors.confirmPassword = "El campo es obligatorio";
    }
    else if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
  };
  return (
    <section className="bg-[rgb(120,155,234)] w-screen h-screen flex justify-center items-center">
       <section className="bg-[rgb(240,243,250)] w-screen h-screen max-w-[1500px] rounded-md max-h-[800px] flex flex-row ">
       <div className=" w-[50%] h-full relative flex items-center flex-col justify-around">
        <div className="text-center">
          <h1 className="font-black font-playwrite text-4xl mb-1">
            ¡Bienvenido a <span className="text-blue-500">AutDetect</span>!
          </h1>
          <p className="font-montserrat mt-4">
            Crea un usuario para iniciar los diagnósticos de pacientes
          </p>
        </div>

        <img className="w-[500px] h-[420px]" src={img_login}></img>
      </div>
      <div className="w-[50%] h-full flex items-center justify-center">
        <div className="bg-white w-[420px] h-auto rounded-md p-4 pb-1">
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
              onClick={handleSubmit}
            ></Button>
          </form>
        </div>
      </div>
       </section>
    </section>
  );
}

export default Login;
