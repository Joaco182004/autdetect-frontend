import React, { useState, PureComponent } from "react";
import {
  LineChart, Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../pages/style.css";
import { ChartBarIcon} from "@heroicons/react/24/solid";
import { PresentationChartLineIcon,UserIcon} from "@heroicons/react/24/outline";
export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isChart,setChart] = useState(true)
  const toggleClass = (state) => {
    if (isActive != state) {
      setIsActive(state);
      setChart(!state)
    }
  };
  const data2 = [
    {
        name: 'Ene',
        paciente_con_TEA: 4000,
        paciente_con_DT: 2400,
    },
    {
        name: 'Feb',
        paciente_con_TEA: 3000,
        paciente_con_DT: 1398,
    },
    {
        name: 'Mar',
        paciente_con_TEA: 2000,
        paciente_con_DT: 9800,
    },
    {
        name: 'Abr',
        paciente_con_TEA: 2780,
        paciente_con_DT: 3908,
    },
    {
        name: 'May',
        paciente_con_TEA: 1890,
        paciente_con_DT: 4800,
    },
    {
        name: 'Jun',
        paciente_con_TEA: 2390,
        paciente_con_DT: 3800,
    },
    {
        name: 'Jul',
        paciente_con_TEA: 3490,
        paciente_con_DT: 4300,
    },
    {
        name: 'Ago',
        paciente_con_TEA: 2100,
        paciente_con_DT: 3200,
    },
    {
        name: 'Sep',
        paciente_con_TEA: 2600,
        paciente_con_DT: 4100,
    },
    {
        name: 'Oct',
        paciente_con_TEA: 2800,
        paciente_con_DT: 4500,
    },
    {
        name: 'Nov',
        paciente_con_TEA: 3000,
        paciente_con_DT: 4900,
    },
    {
        name: 'Dic',
        paciente_con_TEA: 3200,
        paciente_con_DT: 5300,
    },
];
  
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
            <div className="bg-blue-500 rounded w-4 h-8"></div>
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
                  Total de pacientes evaluados
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
            </BarChart>):(<LineChart
            className="mt-4 font-montserrat text-sm"
          width={650}
          height={300}
          data={data2}
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
          <Line type="monotone" dataKey="paciente_con_TEA" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="paciente_con_DT" stroke="#82ca9d" strokeWidth={2}/>
        </LineChart>)}
          </div>
        </div>
        <div className="bg-white w-[340px] h-[480px]  mr-4 mb-4 rounded-md flex flex-col items-center">
        <div className="flex w-[95%] mt-3 justify-start items-center">
            <div className="bg-[rgb(255,188,153)] rounded w-4 h-8"></div>
            <h2 className="font-montserrat font-semibold text-lg ml-2">
              Pacientes evaluados
            </h2>
          </div>
          <div className="flex font-montserrat text-sm w-[315px]  mt-4  text-[rgb(156,159,162)] font-semibold  ">
            <p className="w-[75%]">Paciente</p>
            <p>Diagnóstico</p>
            
          </div>
          <div className="h-[1px] w-[315px] bg-[rgb(204,204,204)] line"></div>
          <ul className="w-full flex flex-col items-center">
            <li>
            <div className="w-[315px] mt-4 flex h-auto p-1 items-center">
              <div className="flex w-[75%]" >
              <div className="w-12 h-12 p-1 rounded-md bg-red-400 flex items-center justify-center font-bold text-lg font-montserrat">
                JD
              </div>
              <div className="ml-2  font-montserrat text-sm">
                <p className="font-medium">Joaquin Diaz Chau</p>
                <p>18 años</p>
              </div>
              </div>
              <div className="text-center w-[25%] font-montserrat text-sm">
                <p className="font-semibold text-blue-500">TEA</p>
                <p>Prob: 85%</p>
              </div>
            </div>
            </li>
            <li>
            <div className="w-[315px] mt-4 flex h-auto p-1 items-center">
              <div className="flex w-[75%]" >
              <div className="w-12 h-12 p-1 rounded-md bg-red-400 flex items-center justify-center font-bold text-lg font-montserrat">
                JD
              </div>
              <div className="ml-2  font-montserrat text-sm">
                <p className="font-medium">Joaquin Diaz Chau</p>
                <p>18 años</p>
              </div>
              </div>
              <div className="text-center w-[25%] font-montserrat text-sm">
                <p className="font-semibold text-blue-500">TEA</p>
                <p>Prob: 85%</p>
              </div>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
