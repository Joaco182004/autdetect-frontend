import { React, useEffect, useState,useRef,useLayoutEffect } from "react";
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
import {Tabs, Tab} from "@nextui-org/react";
import { getAllQuestionnaire } from "../api/questionnaire.api";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";


import "../pages/style.css";
import Home from "./Home";
export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('');
  const [bubbleStyle, setBubbleStyle] = useState({});
  const navRef = useRef(null);

  const links = ['Home', 'Lista de Pacientes', 'Evaluaciones', 'Perfil'];

  const handleMouseEnter = (e, link) => {
    
    setActiveLink(link);
    adjustBubble(e.target);
    
  };

  const adjustBubble = (target) => {
    const targetRect = target.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();
    
    setBubbleStyle({
      width: `${targetRect.width + 35}px`,
      transform: `translateX(${targetRect.left - parentRect.left-2}px)`,
    });
  };
  const location = useLocation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate();
  const limpiarSesion =()=>{
    localStorage.clear();
    navigate("/login")
  }
  useEffect(() => {
    console.log(location)
    if(location.pathname == '/app/dashboard'){
      setActiveLink("Home")
    }
    else if(location.pathname == '/app/pacientes'){
      setActiveLink("Lista de Pacientes")
    }
    else if(location.pathname == '/app/evaluaciones'){
      setActiveLink("Evaluaciones")
    }
    else if(location.pathname == '/app/perfil'){
      setActiveLink("Perfil")
    }
    console.log("Hola")
    const activeElement = document.querySelector('.active');
    if (activeElement) {
      adjustBubble(activeElement);
    }
  }, [activeLink]); // Se ejecuta cada vez que cambie el enlace activo


  return (
    <section className="bg-[rgba(134,185,221,0.5)] w-screen h-screen flex justify-center items-center">
      <section className="bg-[rgb(244,244,244)] w-screen h-screen max-w-[1500px]  max-h-[900px] flex items-center select-none container-main max-w-1080:flex-col">
      <nav className="bg-white h-[100%] w-[300px] max-w-1300:w-[275px] flex flex-col rounded-s-[0.375rem] max-w-1080:hidden">
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
        <ul className="flex flex-col items-center w-full mt-1 max-w-1300:text-[0.95rem]">
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
      <nav className="bg-white w-full h-24 hidden justify-between items-center max-w-1080:flex">
      <h1 className="font-playwrite text-blue-500 font-bold text-2xl ml-8">
            AutDetect
          </h1>
          <div className="bg-gray-100 rounded-full px-4 py-2 relative flex justify-center font-montserrat">
          <ul ref={navRef} className="flex space-x-8 relative">
        {links.map(link => (
          <li key={link} onClick={()=>{if(link=="Home"){
            navigate("dashboard")
          }else if(link =="Lista de Pacientes"){
            navigate("pacientes")
          }else if(link=="Evaluaciones"){
            navigate("evaluaciones")
          }else{
            navigate("perfil")
          }}}>
            <a
              onMouseEnter={(e) => handleMouseEnter(e, link)}
              className={`relative z-10 text-lg max-w-870:text-sm font-semibold transition-colors duration-300 ${
                activeLink === link ? 'active text-white' : 'text-gray-700'
              }`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <div
        className="absolute bg-blue-500 rounded-full h-10 transition-all duration-300 ease-in-out"
        style={{
          ...bubbleStyle,
          height: '100%',
          top: '0',
          left: '0',
        }}
      />
          </div>
        <div onClick={onOpen} className="mr-8">

            <p className="font-montserrat ml-2 text-blue-500 font-semibold cursor-pointer">
              Cerrar Sesión
            </p>
        </div>
      </nav>
      <div className="w-full h-full overflow-x-hidden border-[rgb(244,244,244)] border-l-2 rounded-[5px]">
        <div className="  w-full bg-[rgb(244,244,244)] cont-bottom">
          <Outlet />
        </div>
      </div>
    </section>
    </section>
  );
}
