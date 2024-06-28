import React from "react";
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

import "../pages/style.css"
export default function Dashboard() {
  return (
    <section className="bg-[rgb(244,244,244)] w-screen h-screen flex items-center">
      <nav className="bg-white h-[100%] w-[300px] flex flex-col">
        <img src="https://freepngimg.com/save/32196-pepsi-logo-transparent/686x670" className="h-[60px] w-[60px] ml-[10px] mt-[10px]"></img>

        <ul className="flex flex-col items-center w-full mt-5">
          <li className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2">
            <HomeIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <HomeIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="ml-2 text-[rgb(39,42,48)]">Home</p>
          </li>
          <li className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2">
            <ClipboardDocumentListIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <ClipboardDocumentListIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="ml-2 text-[rgb(39,42,48)]">Evaluación</p>
          </li>
          <li className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2">
            <UserGroupIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <UserGroupIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="ml-2 text-[rgb(39,42,48)]">Lista de Pacientes</p>
          </li>
          <li className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2">
            <UserCircleIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <UserCircleIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="ml-2 text-[rgb(39,42,48)]">Perfil</p>
          </li>
          <li className="group hover:bg-[rgb(244,244,244)] hover:shadow-md cursor-pointer p-[10px] rounded-md flex items-center w-[90%] mb-2">
            <ArrowLeftEndOnRectangleIconLine className="size-6 text-[rgb(39,42,48)] group-hover:hidden" />
            <ArrowLeftEndOnRectangleIcon className="size-6 text-[rgb(39,42,48)] hidden group-hover:block" />
            <p className="ml-2 text-[rgb(39,42,48)]">Cerrar Sesión</p>
          </li>
        </ul>
      </nav>
      <div className="w-full h-full bg-red-500">
        <div className="h-[80px] w-full bg-white">

        </div>
        <div className="w-full bg-yellow-200 cont-bottom">

        </div>
      </div>
    </section>
  );
}
