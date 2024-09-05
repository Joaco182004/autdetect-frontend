import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Button,
  code,
} from "@nextui-org/react";
import { MailIcon } from "../assets/MailIcon.jsx";
import { changePasswordEmail, validateCode } from "../api/custom.api.js";
import { ToastContainer, toast } from "react-toastify";
export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [section, setSection] = useState(0);
  const [codeVerification, setCodeVerification] = useState("");

  async function validateEmails() {
    const emailJson = {
      email: email,
    };
    if (!email) {
      toast.error("Debe completar el campo de correo.", {
        position: "bottom-center",
        style: {
          width: 325,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      try {
        await changePasswordEmail(emailJson);
        toast.success("Se ha enviado el código de verificación al correo.", {
          position: "bottom-center",
          style: {
            width: 410,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
        setSection(1);
      } catch (e) {
        toast.error(
          e.response.data || "Error al enviar el correo de verificación.",
          {
            position: "bottom-center",
            style: {
              width: 410,
              fontSize: "0.85rem",
              fontFamily: "Montserrat",
            },
          }
        );
      }
    }
  }
  async function validateCodeForm() {
    const codeJson = {
      email: email,
      code: codeVerification,
    };
    try {
      await validateCode(codeJson);
      toast.success("El código ingresado es correcto.", {
        position: "bottom-center",
        style: {
          width: 300,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } catch (e) {
      toast.error(e.response?.data|| "Error al verificar el código.", {
        position: "bottom-center",
        style: {
          width: 380,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    }
  }

  return (
    <section className="bg-[rgba(134,185,221,0.5)] w-screen h-screen flex justify-center items-center font-montserrat">
      <Card className="w-[400px]">
        <CardHeader className="flex justify-around">
          <div className="flex flex-col justify-between">
            <h2 className="text-md font-semibold">
              Recuperación de Contraseña
            </h2>
            <p className="text-small text-default-500">
              Soporte: autdetect@gmail.com
            </p>
          </div>
          <h1 className="text-blue-500 text-sm font-playwrite">AutDetect</h1>
        </CardHeader>
        <Divider />
        {section == 0 ? (
          <>
            <CardBody>
              <p className="text-sm mb-4 mx-1 text-justify">
                Por favor, ingrese el correo asociado a su cuenta. Le enviaremos
                un código de verificación para que pueda proceder con el cambio
                de contraseña.
              </p>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Ingresa tu correo registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                onClick={validateEmails}
                color="primary"
                className="font-semibold"
              >
                Enviar código de Verificación
              </Button>
            </CardFooter>
          </>
        ) : section == 1 ? (
          <>
            <CardBody>
              <p className="text-sm mb-4 mx-1 text-justify">
                Por favor, ingrese el código de 6 dígitos de verificación que ha
                sido enviado a su cuenta.
              </p>
              <Input
                autoFocus
                label="Código de Verificación"
                placeholder="Ingresa el código de verificación"
                value={codeVerification}
                onChange={(e) => setCodeVerification(e.target.value)}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                onClick={validateCodeForm}
                color="primary"
                className="font-semibold"
              >
                Validar código de Verificación
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardBody>
              <p className="text-sm mb-4 mx-1 text-justify">
                Por favor, ingrese el correo asociado a su cuenta. Le enviaremos
                un código de verificación para que pueda proceder con el cambio
                de contraseña.
              </p>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Ingresa tu correo registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                onClick={validateEmails}
                color="primary"
                className="font-semibold"
              >
                Enviar código de Verificación
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      <ToastContainer />
    </section>
  );
}
