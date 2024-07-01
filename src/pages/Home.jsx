import React, { useState, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../pages/style.css";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isChart,setChart] = useState(true)
  const toggleClass = (state) => {
    if (isActive != state) {
      setIsActive(state);
      setChart(!state)
    }
  };

  const data = [
    {
      name: "Ene",
      Cantidad_de_Diagnósticos: 1000,
    },
    {
      name: "Feb",
      Cantidad_de_Diagnósticos: 1500,
    },
    {
      name: "Mar",
      Cantidad_de_Diagnósticos: 1200,
    },
    {
      name: "Abr",
      Cantidad_de_Diagnósticos: 1700,
    },
    {
      name: "May",
      Cantidad_de_Diagnósticos: 1100,
    },
    {
      name: "Jun",
      Cantidad_de_Diagnósticos: 1400,
    },
    {
      name: "Jul",
      Cantidad_de_Diagnósticos: 1600,
    },
    {
      name: "Ago",
      Cantidad_de_Diagnósticos: 1300,
    },
    {
      name: "Set",
      Cantidad_de_Diagnósticos: 1800,
    },
    {
      name: "Oct",
      Cantidad_de_Diagnósticos: 1900,
    },
    {
      name: "Nov",
      Cantidad_de_Diagnósticos: 2100,
    },
    {
      name: "Dic",
      Cantidad_de_Diagnósticos: 2200,
    },
  ];
  const classes = `w-1/2 h-[5.25rem] rounded-md absolute bg-white ${
    isActive ? "activeClassOne" : "activeClassTwo"
  }`;
  return (
    <section className="w-full h-full">
      <h1 className="font-montserrat font-semibold mb-[1rem] ml-[2rem] pt-[1rem] text-4xl">
        Dashboard
      </h1>
      <div className=" w-full cont-section-dash flex gap-4">
        <div className="bg-white w-[650px] h-[480px] ml-[2rem] rounded-md flex flex-col items-center">
          <div className="flex w-[95%] mt-3 justify-start items-center">
            <div className="bg-blue-500 rounded-md w-3 h-8"></div>
            <h2 className="font-montserrat font-semibold text-lg ml-2">
              Vista General
            </h2>
          </div>
          <div className="w-[95%] flex bg-[rgb(244,244,244)] p-2 gap-4 mt-3 rounded-md relative">
            <div className={classes}></div>
            <div
              onClick={() => {
                toggleClass(false);
              }}
              className="w-1/2 h-[5.25rem] z-10 select-none rounded-md cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="ml-4 w-14 h-14 flex justify-center items-center bg-blue-500 rounded-full">
                  <ChartBarIcon className="w-9 text-"></ChartBarIcon>
                </div>
              </div>
              <div className="ml-4 font-montserrat">
                <p className="text-[rgb(156,159,162)] font-semibold">
                  Total de pacientes diagnósticados
                </p>
                <h3 className="mt-1 font-medium">1050 pacientes</h3>
              </div>
            </div>
            <div
              onClick={() => {
                toggleClass(true);
              }}
              className="w-1/2 h-[5.25rem] z-10 select-none rounded-md cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="ml-4 w-14 h-14 flex justify-center items-center bg-[rgb(196,170,250)] rounded-full">
                  <PresentationChartLineIcon className="w-9 text-"></PresentationChartLineIcon>
                </div>
              </div>
              <div className="ml-4 font-montserrat">
                <p className="text-[rgb(156,159,162)] font-semibold">
                  Pacientes totales con TEA
                </p>
                <h3 className="mt-1 font-medium">550 pacientes</h3>
              </div>
            </div>
          </div>
          <div>
            {isChart ? (<BarChart
              className="mt-4 font-montserrat text-sm"
              width={650}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              
              <Bar
                dataKey="Cantidad_de_Diagnósticos"
                fill="#0084F6"
                activeBar={<Rectangle fill="rgb(120,155,234)" stroke="blue" />}
              />
            </BarChart>):(<></>)}
          </div>
        </div>
        <div className="bg-white w-[30%] mr-4 mb-4 rounded-md"></div>
      </div>
    </section>
  );
}
