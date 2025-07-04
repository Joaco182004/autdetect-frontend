import React, { useEffect, useState} from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { getPsychologistById } from "../api/psychologist.api";
import { login } from "../api/authorization.api.js";
import { IdentificationIcon, AtSymbolIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  sendEmailChange,
  changeUsername,
  changePassword as changePasswordFunc,
} from "../api/custom.api";
import { ToastContainer, toast } from "react-toastify";
import { EyeFilledIcon } from "../assets/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon.jsx";
import { getUserProfileById } from "../api/userprofile.api.js";
export default function Profile() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [psychologist, setPsychologist] = useState(null);
  const [emailChange, setEmailChange] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordChange1, setPasswordChange1] = useState("");
  const [passwordChange2, setPasswordChange2] = useState("");
  const [passwordChange3, setPasswordChange3] = useState("");
  const [nextValidation, setNextValidation] = useState(0);
  const [nextPassword, setNextPassword] = useState(0);
  const [codeVerification, setCodeVerification] = useState("");
  async function getPsychologist() {
    const user = await getPsychologistById();
    setPsychologist(user.data);
  }
  useEffect(() => {
    getPsychologist();
  }, []);

  function resetForm() {
    setPasswordChange1("");
    setPasswordChange2("");
    setEmailChange("");
    setNextValidation(0);
    setNextPassword(0);
    setCodeVerification("");
    setPasswordVerification("");
  }
  async function validateCodeVertification() {
    const userProfile = await getUserProfileById();
    if (userProfile.data.code_change == codeVerification) {
      try {
        const change = {
          email: psychologist.email,
          email_change: emailChange,
        };
        await changeUsername(change);
        toast.success("Se acaba de modificar el correo electrónico.", {
          position: "bottom-center",
          style: {
            width: 380,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
        resetForm();
        setTimeout(() => {
          window.location.reload(); // Recarga la página después de 3 segundos
        }, 3000);
      } catch (e) {
        toast.error("Ha ocurrido un error. Vuelva intentarlo.", {
          position: "bottom-center",
          style: {
            width: 320,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
      }
    } else {
      toast.error("El código no corresponde al código enviado.", {
        position: "bottom-center",
        style: {
          width: 380,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    }
  }
  async function validateEmail() {

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailChange) || !emailChange) {
      toast.error("Asegúrate de ingresar un correo con el formato correcto, por ejemplo: nombre@dominio.com, y que el correo exista.", {
        position: "bottom-center",
        style: {
          width: 370,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      try {
        const change = {
          email: psychologist.email,
          email_change: emailChange,
        };
        await sendEmailChange(change);

        toast.success(
          "Se acaba de enviar un código de verificación al nuevo correo.",
          {
            position: "bottom-center",
            style: {
              width: 500,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          }
        );
        setNextValidation(2);
      } catch (e) {
        toast.error("El correo ya se encuentra registrado en el sistema.", {
          position: "bottom-center",
          style: {
            width: 320,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
      }
    }
  }
  async function validatePassword(next) {
    if (!passwordVerification && !passwordChange1) {
      toast.error("Debe completar el campo de contraseña.", {
        position: "bottom-center",
        style: {
          width: 370,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      const userLogin = {
        username: psychologist.email,
        password: next == 0 ? passwordVerification : passwordChange1,
      };
      login(userLogin)
        .then((response) => {
          toast.success("Se validó la contraseña.", {
            position: "bottom-center",
            style: {
              width: 240,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
          if (next == 0) {
            setNextValidation(1);
          } else {
            setNextPassword(1);
          }
        })
        .catch((error) => {
          toast.error("La contraseña no es correcta.", {
            position: "bottom-center",
            style: {
              width: 270,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
        });
    }
  }
  function validarContraseña(contraseña) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Test de la contraseña con la expresión regular
    return regex.test(contraseña);
  }
  async function changePassword() {
    if (!passwordChange2) {
      toast.error("Debe completar el campo de contraseña.", {
        position: "bottom-center",
        style: {
          width: 370,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      if (validarContraseña(passwordChange2)) {
        if(passwordChange2 == passwordChange3){
          const userLogin = {
          email: psychologist.email,
          password: passwordChange2,
        };
        try {
          await changePasswordFunc(userLogin);
          toast.success("Se acaba de modificar su contraseña.", {
            position: "bottom-center",
            style: {
              width: 380,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
          resetForm();
          setTimeout(() => {
            window.location.reload(); // Recarga la página después de 3 segundos
          }, 3000);
        } catch (e) {
          toast.error("Ha ocurrido un error, vuelva a intentarlo.", {
            position: "bottom-center",
            style: {
              width: 320,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          });
        }
      } else {
        toast.error("La contraseña nueva y de validación no coinciden.", {
          position: "bottom-center",
          style: {
            width: 370,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
        }
      }else {
        toast.error("La contraseña no cumple con los requisitos (La contraseña sea alfanumérica, contenga al menos una letra mayúscula, un carácter especial y tenga una longitud mínima de 8 caracteres).", {
          position: "bottom-center",
          style: {
            width: 370,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
        }
    }
  }
  return (
    <section className="tracking-in-expand2 bg-[#f4f4f4]  w-full h-full max-w-820:h-auto  outline-none select-none overflow-hidden max-w-820:overflow-y-auto">
      <h1 className="tracking-in-expand font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Perfil
      </h1>
      <div className="flex h-full w-full max-w-820:flex-col">
        <div className="h-[80%] w-[40%] flex flex-col max-w-820:w-[90%] max-w-820:h-[300px] max-w-500:w-[100%] max-w-500:mx-0 items-center bg-white ml-8 content-list rounded-md pb-4 max-w-820:py-4">
          {psychologist && (
            <div className="flex max-w-820:w-full flex-col max-w-820:flex-row max-w-820:justify-around max-w-820:h-full items-center font-montserrat">
              <div className="flex flex-col justify-center items-center">
              <div className="w-36 h-36 mt-4 rounded-full">
                <UserCircleIcon className="w-full h-fulll text-blue-500 rounded-full"></UserCircleIcon>
              </div>
              <p className="mt-2 text-xl font-montserrat font-semibold mb-4">
                {psychologist.full_name}
              </p>
              </div>
              <div className="max-w-820:h-full max-w-820:flex max-w-820:flex-col max-w-820:items-center max-w-820:justify-center ">
              <div className="flex flex-col h-[60px] max-w-600:w-[100%]   rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4">
                  <IdentificationIcon className="w-8 max-w-425:w-6 text-blue-600 mr-1"></IdentificationIcon>
                  <h5 className="font-semibold max-w-425:text-[0.85rem]">N° de Documento:</h5>
                </div>
                <p className="ml-4 mt-2 max-w-425:text-[0.85rem]">{psychologist.dni}</p>
              </div>
              <Divider className="my-1 max-w-600:w-[100%] max-w-425:w-[90%]" />
              <div className="flex flex-col h-[60px] max-w-600:w-[100%]  rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4">
                  <CreditCardIcon className="w-8 max-w-425:w-6 text-blue-600 mr-1"></CreditCardIcon>
                  <h5 className="font-semibold max-w-425:text-[0.85rem]">N° de Licencia:</h5>
                </div>
                <p className="ml-4 mt-2 max-w-425:text-[0.85rem]">{psychologist.tuition_number}</p>
              </div>
              <Divider className="my-1 max-w-600:w-[100%] max-w-425:w-[90%]" />
              <div className="flex flex-col  h-[60px] max-w-600:w-[100%]   rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4">
                  <AtSymbolIcon className="w-8 max-w-425:w-6 text-blue-600 mr-1"></AtSymbolIcon>
                  <h5 className="font-semibold max-w-425:text-[0.85rem]">Correo Electrónico:</h5>
                </div>
                <p className="ml-4 mt-2 max-w-425:text-[0.85rem]">{psychologist.email}</p>
              </div>
              </div>
            </div>
          )}
        </div>
        <div className="h-[80%] w-[70%] flex flex-col items-center max-w-820:my-4 max-w-820:w-[90%] max-w-500:w-[100%] max-w-500:mx-0 max-w-820:mx-8  max-w-820:h-[100%]  bg-white mx-6 content-list rounded-md pb-4">
          <div className="w-[97%] font-montserrat">
            <Tabs
              className="mt-4"
              variant="underlined"
              color="primary"
              aria-label="Options"
            >
              <Tab
                className="font-semibold max-w-450:text-[0.8rem] max-w-425:text-xs max-w-395:text-[0.65rem]"
                key="photos"
                title="Modificación de Correo"
              >
                <Card className="font-normal">
                  <CardBody>
                    {nextValidation == 0 ? (
                      <form>
                        <h3 className="font-semibold text-xl">
                          Modificación de Correo
                        </h3>
                        <p className="mt-2 text-sm">
                          Por favor, ingrese su contraseña para validarla.
                          Luego, introduzca el nuevo correo electrónico. Se
                          enviará un código de verificación al correo
                          proporcionado. Una vez que el código sea verificado,
                          se procederá con el cambio de correo electrónico.
                        </p>
                        <Input
                          label="Contraseña"
                          placeholder="Ingrese su contraseña"
                          endContent={
                            <button
                              className="focus:outline-none "
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          className="my-4 w-96 max-w-450:w-72"
                          value={passwordVerification}
                          onChange={(e) =>
                            setPasswordVerification(e.target.value)
                          }
                        />
                        <Button
                          onClick={() => {
                            validatePassword(0);
                          }}
                          color="primary"
                        >
                          Validar Contraseña
                        </Button>
                      </form>
                    ) : nextValidation == 1 ? (
                      <form>
                        <h3 className="font-semibold text-xl">
                          Modificación de Correo
                        </h3>
                        <p className="mt-2 text-sm">
                          Por favor, ingrese el nuevo correo electrónico. Se
                          enviará un código de verificación al correo
                          proporcionado. Una vez que se verifique el código, se
                          realizará el cambio de correo electrónico.
                        </p>
                        <Input
                          className="my-4 w-96 max-w-450:w-72"
                          type="email"
                          label="Correo Electrónico"
                          placeholder="Ingrese el nuevo correo"
                          value={emailChange}
                          onChange={(e) => setEmailChange(e.target.value)}
                        />
                        <Button onClick={validateEmail} color="primary">
                          Validar Correo
                        </Button>
                      </form>
                    ) : (
                      <form>
                        <h3 className="font-semibold text-xl">
                          Modificación de Correo
                        </h3>
                        <p className="mt-2 text-sm">
                          Ya se ha enviado el correo que contiene el código de
                          verificación. Por favor, ingrese el codigo de
                          verificación que se ha enviado al nuevo correo.
                        </p>
                        <Input
                          className="my-4 w-96 max-w-450:w-72"
                          type="email"
                          label="Código de Verificación"
                          placeholder="Ingrese el código de 6 dígitos"
                          value={codeVerification}
                          onChange={(e) => setCodeVerification(e.target.value)}
                        />
                        <Button
                          onClick={validateCodeVertification}
                          color="primary"
                        >
                          Validar Correo
                        </Button>
                      </form>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                className="font-semibold max-w-450:text-[0.8rem] max-w-425:text-xs max-w-395:text-[0.65rem]"
                key="music"
                title="Modificación de Contraseña"
              >
                <Card className="font-normal">
                  <CardBody>
                    {nextPassword == 0 ? (
                      <form>
                        <h3 className="font-semibold text-xl">
                          Modificación de Contraseña
                        </h3>
                        <p className="mt-2 text-sm">
                          Para cambiar su contraseña, verifique primero su
                          contraseña actual. Luego, ingrese y confirme su nueva
                          contraseña para completar el proceso.
                        </p>
                        <Input
                          label="Contraseña"
                          placeholder="Ingrese su contraseña"
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          className="my-4 w-96 max-w-450:w-72"
                          value={passwordChange1}
                          onChange={(e) => setPasswordChange1(e.target.value)}
                        />
                        <Button
                          color="primary"
                          onClick={() => {
                            validatePassword(1);
                          }}
                        >
                          Validar Contraseña
                        </Button>
                      </form>
                    ) : (
                      <form>
                        <h3 className="font-semibold text-xl">
                          Modificación de Contraseña
                        </h3>
                        <p className="mt-2 text-sm">
                          Su cuenta ha sido verificada. Por favor, ingrese una
                          nueva contraseña que contenga al menos una mayúscula,
                          un carácter especial, un número y tenga una longitud
                          mínima de 8 caracteres e ingresela nuevamente para verificar si es correcta.{" "}
                        </p>
                        <Input
                          label="Contraseña Nueva"
                          placeholder="Ingrese su nueva contraseña"
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          className="my-4 w-96 max-w-450:w-72"
                          value={passwordChange2}
                          onChange={(e) => setPasswordChange2(e.target.value)}
                        />
                        <Input
                          label="Verificación de Contraseña"
                          placeholder="Repita su nueva contraseña"
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          className="my-4 w-96 max-w-450:w-72"
                          value={passwordChange3}
                          onChange={(e) => setPasswordChange3(e.target.value)}
                        />
                        <Button color="primary" onClick={changePassword}>
                          Modificar Contraseña
                        </Button>
                      </form>
                    )}
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
