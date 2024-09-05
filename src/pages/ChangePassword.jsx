import React, { useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image,Input, Button} from "@nextui-org/react";
import { MailIcon } from '../assets/MailIcon.jsx';
import { getAllPsychologist } from '../api/psychologist.api.js';
import { ToastContainer, toast } from "react-toastify";
export default function ChangePassword() {
    const [emails,setEmails]=useState([])
    const [email,setEmail] =useState("")
    async function getAllEmails() {
        const emailArray =[]
        const users = await getAllPsychologist();
        users.data.map((e)=>{
            emailArray.push(e.email)
        })
        setEmails(emailArray)
    }
    useEffect(()=>{
        getAllEmails()
    },[])

    function validateEmails(){
        if(emails.includes(email)){
            toast.success("Se ha enviado el código de verificación al correo.", {
                position: "bottom-center",
                style: {
                  width: 410,
                  fontSize: "0.85rem",
                  fontFamily: "Montserrat",
                },
              });
        }
        else{
            toast.error("El correo ingresado no se encuentra registrado.", {
                position: "bottom-center",
                style: {
                  width: 410,
                  fontSize: "0.85rem",
                  fontFamily: "Montserrat",
                },
              }); 
        }
    }
  return (
    <section className='bg-[rgba(134,185,221,0.5)] w-screen h-screen flex justify-center items-center font-montserrat'>
        <Card className="w-[400px]">
      <CardHeader className="flex justify-around">
      <div className="flex flex-col justify-between">
          <h2  className="text-md font-semibold">Recuperación de Contraseña</h2>
          <p className="text-small text-default-500">Soporte: autdetect@gmail.com</p>
        </div>
        <h1 className='text-blue-500 text-sm font-playwrite'>AutDetect</h1>
        
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className='text-sm mb-4 mx-1 text-justify'>Por favor, ingrese el correo asociado a su cuenta. Le enviaremos un código de verificación para que pueda proceder con el cambio de contraseña.</p>
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
      <Divider/>
      <CardFooter>
        <Button onClick={validateEmails} color='primary' className='font-semibold'>Enviar código de Verificación</Button>
      </CardFooter>
    </Card>
    <ToastContainer/>
    </section>
  )
}
