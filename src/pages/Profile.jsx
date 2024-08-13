import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getPsychologistById } from "../api/psychologist.api";
import { IdentificationIcon,AtSymbolIcon } from "@heroicons/react/24/solid";
import {Divider} from "@nextui-org/react";
export default function Profile() {
  const [psychologist, setPsychologist] = useState(null);
  async function getPsychologist() {
    const user = await getPsychologistById();
    console.log(user.data);
    setPsychologist(user.data);
  }
  useEffect(() => {
    getPsychologist();
  }, []);
  return (
    <section className="tracking-in-expand2 bg-[#f4f4f4]  w-full h-full  outline-none select-none overflow-hidden">
      <h1 className="tracking-in-expand font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Perfil
      </h1>
      <div className="flex h-full w-full">
        <div className="h-[80%] w-[40%] flex flex-col  items-center bg-white ml-8 content-list rounded-md pb-4">
          {psychologist && (
            <div className="flex flex-col items-center font-montserrat">
              <div className="w-36 h-36 mt-4 rounded-full bg-red-500"></div>
              <p className="mt-2 text-xl font-montserrat font-semibold mb-2">
                {psychologist.full_name}
              </p>
             
              <p className="text-xs mt-2 mb-4 text-blue-500 cursor-pointer">Cambiar Foto de Perfil</p>
              <div className="flex flex-col h-[60px]  rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4"><IdentificationIcon className="w-8 text-blue-600 mr-1"></IdentificationIcon><h5 className="font-semibold">N° de Documento:</h5></div>
                <p className="ml-4 mt-2">{psychologist.dni}</p>
              </div>
              <Divider className="my-1" />
              <div className="flex flex-col h-[60px] rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4"><IdentificationIcon className="w-8 text-blue-600 mr-1"></IdentificationIcon><h5 className="font-semibold">N° de Licencia:</h5></div>
                <p className="ml-4 mt-2">{psychologist.tuition_number}</p>
              </div>
              <Divider className="my-1" />
              <div className="flex flex-col  h-[60px]  rounded-xl my-2 justify-center  items-center w-[320px]">
                <div className="flex items-center ml-4"><AtSymbolIcon className="w-8 text-blue-600 mr-1"></AtSymbolIcon><h5 className="font-semibold">Correo Electrónico:</h5></div>
                <p className="ml-4 mt-2">{psychologist.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-[80%] w-[70%] flex flex-col items-center bg-white mx-6 content-list rounded-md pb-4"></div>
      </div>
    </section>
  );
}
