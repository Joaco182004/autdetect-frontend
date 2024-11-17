import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleBackToPrevious = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="bg-[rgba(134,185,221,0.5)] w-screen h-screen flex flex-col justify-center items-center text-center p-4">
      <div className="relative font-montserrat">
        {/* Decorative Circle */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-72 h-72 bg-cyan-100 rounded-full blur-xl opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative bg-white shadow-xl rounded-lg p-8 max-w-md text-center z-10">
          <h1 className="text-8xl md:text-9xl font-extrabold text-cyan-600">
            404
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mt-4">
            Lo sentimos, no podemos encontrar la página que estás buscando.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Es posible que el enlace sea incorrecto o que la página haya sido
            movida.
          </p>
          <button
            onClick={handleBackToPrevious}
            className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-600 hover:shadow-lg transition duration-300"
          >
            Volver a la Página Anterior
          </button>
        </div>
      </div>

    </div>
  );
};

export default Error404;
