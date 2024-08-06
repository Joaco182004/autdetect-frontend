import { React, useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconLine,
  ClipboardDocumentListIcon as ClipboardDocumentListIconLine,
  UserGroupIcon as UserGroupIconLine,
  UserCircleIcon as UserCircleIconLine,
  ArrowLeftEndOnRectangleIcon as ArrowLeftEndOnRectangleIconLine,
} from "@heroicons/react/24/outline";

import { getAllQuestionnaire } from "../api/questionnaire.api";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";


import "../pages/style.css";
import Home from "./Home";
export default function Dashboard() {
  const location = useLocation();
 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate();
  const limpiarSesion =()=>{
    localStorage.clear();
    navigate("/login")
  }
  
  return (
    <section className="bg-[rgb(244,244,244)] w-screen h-screen flex items-center select-none">
      <nav className="bg-white h-[100%] w-[300px] flex flex-col">
        <div>
          <h1 className="font-playwrite text-blue-500 text-center font-bold w-[100%] h-[100px] flex  items-center justify-center text-2xl">
            AutDetect
          </h1>
        </div>
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className="font-montserrat z-50"
      >
        <ModalContent>
        {(onClose) => (<>
        <ModalHeader className="flex flex-col gap-1">Cerrar Sesión</ModalHeader>
        <ModalBody>
          <p>¿Desea cerrar la sesión actual?</p>
        </ModalBody>
        <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={limpiarSesion}>
                  Aceptar
                </Button>
              </ModalFooter></>)}
           </ModalContent>
      </Modal>
        <ul className="flex flex-col items-center w-full mt-1">
          {location.pathname == "/app/dashboard"  ? (
            <li
              onClick={() => {
                navigate("dashboard");
              }}
              className="group bg-[rgb(244,244,244)] shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 font-semibold"
            >
              <HomeIcon className="size-6 text-[rgb(39,42,48)]  group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">Home</p>
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("dashboard");
              }}
              className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 hover:font-semibold"
            >
              <HomeIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
              <HomeIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">Home</p>
            </li>
          )}

          {location.pathname == "/app/pacientes" ? (
            <li
              onClick={() => {
                navigate("pacientes");
              }}
              className="group bg-[rgb(244,244,244)] shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 font-semibold"
            >
              <UserGroupIcon className="size-6 text-[rgb(39,42,48)] group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
                Lista de Pacientes
              </p>
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("pacientes");
              }}
              className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 hover:font-semibold"
            >
              <UserGroupIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
              <UserGroupIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
                Lista de Pacientes
              </p>
            </li>
          )}

          {location.pathname == "/app/evaluaciones" ||location.pathname == "/app/evaluaciones/mchat"  ? (
            <li
              onClick={() => {
                navigate("evaluaciones");
              }}
              className="group bg-[rgb(244,244,244)] shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 font-semibold"
            >
              <ClipboardDocumentListIcon className="size-6 text-[rgb(39,42,48)] group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
                Evaluaciones
              </p>
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("evaluaciones");
              }}
              className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 hover:font-semibold"
            >
              <ClipboardDocumentListIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
              <ClipboardDocumentListIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
                Evaluaciones
              </p>
            </li>
          )}
          {location.pathname == "/app/perfil" ? (
            <li
              onClick={() => {
                navigate("perfil");
              }}
              className="group bg-[rgb(244,244,244)] shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 font-semibold"
            >
              <UserCircleIcon className="size-6 text-[rgb(39,42,48)] group-hover:block" />
              <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
                Perfil
              </p>
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("perfil");
              }}
              className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 hover:font-semibold"
            >
              <UserCircleIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <UserCircleIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">Perfil</p>
            </li>
          )}

         
          <li onClick={onOpen} className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2 hover:font-semibold">
            <ArrowLeftEndOnRectangleIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <ArrowLeftEndOnRectangleIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="font-montserrat ml-2 text-[rgb(39,42,48)]">
              Cerrar Sesión
            </p>
          </li>
        </ul>
      </nav>
      <div className="w-full h-full overflow-x-hidden border-[rgb(244,244,244)] border-l-2">
        <div className="  w-full bg-[rgb(244,244,244)] cont-bottom">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
