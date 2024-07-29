import React, { useState, PureComponent, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Sector, Legend} from "recharts";
import { MapContainer, TileLayer, useMap,Rectangle as Rec,GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import "../pages/style.css";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { PresentationChartLineIcon, UserIcon, } from "@heroicons/react/24/outline";
import { getAllPsychologist } from "../api/psychologist.api.js";
import { getAllQuestionnaire } from "../api/questionnaire.api.js";
import {getQuestionnaireOrderByMonth,getQuestionnaireOrderByMonthAutism,getPatientsByGender} from '../api/custom.api.js'
import { getAllPatients } from "../api/infantPatient.api.js";

export default function Home() {
  // State Initializations
const [patients, setPatients] = useState([]);
const [isActive, setIsActive] = useState(false);
const [isChart, setChart] = useState(true);
const [questionnaire, setQuestionnaire] = useState([]);
const [geojsonData, setGeojsonData] = useState(null);
const [evaluationByMonth,setEvaluationByMonth] = useState([])
const [evaluationByMonthAutism,setEvaluationByMonthAutism] = useState([])
const [patientsByGender,setPatientsByGender] = useState([])
const [patientsByDistrict,setPatientsByDistrict] = useState([])
const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

// Function Definitions

const distritosLimaMetropolitana = [
  { key: "Ancón", coordenadas: { lat: -11.776, lng: -77.157 } },
  { key: "Ate", coordenadas: { lat: -12.027, lng: -76.890 } },
  { key: "Barranco", coordenadas: { lat: -12.144, lng: -77.020 } },
  { key: "Breña", coordenadas: { lat: -12.055, lng: -77.046 } },
  { key: "Carabayllo", coordenadas: { lat: -11.877, lng: -77.038 } },
  { key: "Chaclacayo", coordenadas: { lat: -11.981, lng: -76.802 } },
  { key: "Chorrillos", coordenadas: { lat: -12.171, lng: -77.012 } },
  { key: "Cieneguilla", coordenadas: { lat: -12.062, lng: -76.869 } },
  { key: "Comas", coordenadas: { lat: -11.938, lng: -77.048 } },
  { key: "El Agustino", coordenadas: { lat: -12.051, lng: -77.017 } },
  { key: "Independencia", coordenadas: { lat: -11.982, lng: -77.052 } },
  { key: "Jesús María", coordenadas: { lat: -12.079, lng: -77.050 } },
  { key: "La Molina", coordenadas: { lat: -12.089, lng: -76.936 } },
  { key: "La Victoria", coordenadas: { lat: -12.071, lng: -77.017 } },
  { key: "Lima", coordenadas: { lat: -12.046, lng: -77.030 } },
  { key: "Lince", coordenadas: { lat: -12.073, lng: -77.036 } },
  { key: "Los Olivos", coordenadas: { lat: -11.948, lng: -77.076 } },
  { key: "Lurigancho-Chosica", coordenadas: { lat: -11.931, lng: -76.998 } },
  { key: "Lurín", coordenadas: { lat: -12.266, lng: -76.880 } },
  { key: "Magdalena del Mar", coordenadas: { lat: -12.091, lng: -77.067 } },
  { key: "Miraflores", coordenadas: { lat: -12.120, lng: -77.030 } },
  { key: "Pachacámac", coordenadas: { lat: -12.251, lng: -76.853 } },
  { key: "Pucusana", coordenadas: { lat: -12.475, lng: -76.786 } },
  { key: "Pueblo Libre", coordenadas: { lat: -12.076, lng: -77.057 } },
  { key: "Puente Piedra", coordenadas: { lat: -11.875, lng: -77.041 } },
  { key: "Punta Hermosa", coordenadas: { lat: -12.324, lng: -76.836 } },
  { key: "Punta Negra", coordenadas: { lat: -12.378, lng: -76.788 } },
  { key: "Rímac", coordenadas: { lat: -12.035, lng: -77.029 } },
  { key: "San Bartolo", coordenadas: { lat: -12.386, lng: -76.783 } },
  { key: "San Borja", coordenadas: { lat: -12.108, lng: -77.004 } },
  { key: "San Isidro", coordenadas: { lat: -12.092, lng: -77.046 } },
  { key: "San Juan de Lurigancho", coordenadas: { lat: -11.981, lng: -76.995 } },
  { key: "San Juan de Miraflores", coordenadas: { lat: -12.154, lng: -76.970 } },
  { key: "San Luis", coordenadas: { lat: -12.069, lng: -77.004 } },
  { key: "San Martín de Porres", coordenadas: { lat: -12.011, lng: -77.070 } },
  { key: "San Miguel", coordenadas: { lat: -12.079, lng: -77.082 } },
  { key: "Santa Anita", coordenadas: { lat: -12.048, lng: -76.970 } },
  { key: "Santa María del Mar", coordenadas: { lat: -12.368, lng: -76.788 } },
  { key: "Santa Rosa", coordenadas: { lat: -11.846, lng: -77.158 } },
  { key: "Santiago de Surco", coordenadas: { lat: -12.140, lng: -76.991 } },
  { key: "Surquillo", coordenadas: { lat: -12.120, lng: -77.018 } },
  { key: "Villa El Salvador", coordenadas: { lat: -12.193, lng: -76.952 } },
  { key: "Villa María del Triunfo", coordenadas: { lat: -12.165, lng: -76.936 } }
];

const transformMonth = (month) =>{
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return meses[month - 1]
}

async function loadQuestionnaires() {
  const res = await getAllQuestionnaire();
  setQuestionnaire(res.data)
}

async function loadPatientsByGender() {
  const res = await getPatientsByGender();
  const dataGender = []
  res.data.map(e => {if(e.gender == "M"){dataGender.push({name:"Masculino",value:e.total})}else{dataGender.push({name:"Femenino",value:e.total})}})
  setPatientsByGender(dataGender)
}

function searchQuestionnaire(id){

  const questionnairefind= questionnaire.filter(e => {if(e.patient==id) return e})

  return questionnairefind[0]
}

const transformarCoordenadas = (distrito) => {
  const distritoEncontrado = distritosLimaMetropolitana.find(d => d.key === distrito);
  if (distritoEncontrado) {
    return distritoEncontrado.coordenadas;
  } else {
    console.log("Distrito no encontrado");
  }
};

async function loadPatients() {
  const res = await getAllPatients();
  const datapatient = []
  for (let index = 0; index < res.data.length; index++) {
    const element = res.data[index];
    datapatient.push(element)
    if(index == 4) break
  }
  setPatients(datapatient)
}
async function loadPatientsByDistrict() {
  const res = await getAllPatients();
  const dataDistrict = []
  res.data.map(e => {dataDistrict.push(transformarCoordenadas(e.district))})
  dataDistrict.forEach(e => {
    e.count = 0
  })
  dataDistrict.forEach(e => {
    e.count = e.count + 50
  })
  const sinDuplicados = [...new Set(dataDistrict)];

  setPatientsByDistrict(sinDuplicados)
}
async function loadEvaluations() {
  const res = await getQuestionnaireOrderByMonth();
  res.data.map(e => {e.month = transformMonth(e.month)})

  const dataByMonth = []

  res.data.map(e => {dataByMonth.push({name:e.month,Cantidad_de_Diagnósticos:e.total})})

  setEvaluationByMonth(dataByMonth)
}
async function loadEvaluationsAutism() {
  const res = await getQuestionnaireOrderByMonthAutism();
  res.data.map(e => {e.month = transformMonth(e.month)})

  const dataByMonth = []

  res.data.map(e => {dataByMonth.push({name:e.month,paciente_con_TEA:e.paciente_con_TEA,paciente_con_DT:e.paciente_con_DT})})

  setEvaluationByMonthAutism(dataByMonth)
}
const toggleClass = (state) => {
  if (isActive !== state) {
    setIsActive(state);
    setChart(!state);
  }
};

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();
  React.useEffect(() => {
    const heatmap = L.heatLayer(points, { radius: 25 }).addTo(map);
    return () => {
      map.removeLayer(heatmap);
    };
  }, [points, map]);
  return null;
};
const classes = `w-1/2 h-[5.25rem] rounded-md absolute bg-white ${
  isActive ? "activeClassOne" : "activeClassTwo"
}`;
// GeoJSON Style
const geoJsonStyle = (feature) => {
  return {
    fillColor: 'red',
    weight: 1,
    opacity: 1,
    color: 'skyblue',
    fillOpacity: 0.1
  };
};
function diferenciaEnMeses(fechaInicio, fechaFin) {
  // Asegúrate de que fechaFin sea mayor o igual a fechaInicio
  if (fechaFin < fechaInicio) {
    throw new Error('La fecha de fin debe ser mayor o igual a la fecha de inicio.');
  }

  // Obtener el año y el mes de ambas fechas
  const añoInicio = fechaInicio.getFullYear();
  const mesInicio = fechaInicio.getMonth();
  const añoFin = fechaFin.getFullYear();
  const mesFin = fechaFin.getMonth();

  // Calcular la diferencia en meses
  const diferenciaAños = añoFin - añoInicio;
  const diferenciaMeses = mesFin - mesInicio;

  // Calcular la diferencia total en meses
  return diferenciaAños * 12 + diferenciaMeses;
}
const calculateMonth=(date) =>{
  const today = new Date()
  const bd = new Date(date)
  const diferenciaMeses = diferenciaEnMeses(bd,today);
  return parseInt(diferenciaMeses) + " meses"
}

// Effects

useEffect(() => {
  loadQuestionnaires();
  loadPatientsByGender();
  loadPatients();
  loadEvaluations();
  loadEvaluationsAutism();
  loadPatientsByDistrict();
  const geojsonUrl = "https://raw.githubusercontent.com/joseluisq/peru-geojson-datasets/master/lima_callao_distritos.geojson";
  fetch(geojsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => setGeojsonData(data))
    .catch(error => console.error('Error loading the geojson data: ', error));
}, []);

const countAutism = () =>{
  var contAutism = 0
  questionnaire.map(e=>{
    if(e.result == true){
      contAutism+=1
    }
  })
  return contAutism
}

const heatmapData = {
  max: -1,
  data: patientsByDistrict,
};

  
  return (
    <section className="w-full h-full overflow-auto outline-none select-none">
      <h1 className="tracking-in-expand  font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Dashboard
      </h1>
      <div className=" w-full h-auto pb-4 cont-section-dash flex gap-4">
        <div>
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
                  <h3 className="mt-1 font-medium">{questionnaire.length} pacientes</h3>
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
                  <h3 className="mt-1 font-medium">{countAutism()} pacientes</h3>
                </div>
              </div>
            </div>
            <div>
              {isChart ? (
                <BarChart
                  className="mt-4 font-montserrat text-sm "
                  width={650}
                  height={300}
                  data={evaluationByMonth}
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
                    activeBar={
                      <Rectangle fill="rgb(120,155,234)" stroke="blue" />
                    }
                  />
                </BarChart>
              ) : (
                <LineChart
                  className="mt-4 font-montserrat text-sm"
                  width={650}
                  height={300}
                  data={evaluationByMonthAutism}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickCount={4}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="paciente_con_TEA"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="paciente_con_DT"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </div>
          </div>
          <div className="bg-white w-[650px] h-[480px] ml-[2rem] mt-4 rounded-md flex flex-col items-center">
            <div className="flex w-[95%] mt-3 justify-start items-center">
              <div className="bg-[rgb(142,89,255)] rounded w-4 h-8"></div>
              <h2 className="font-montserrat font-semibold text-lg ml-2">
                Localidad de los pacientes
              </h2>
            </div>
            <MapContainer
              center={[-12.0464, -77.0428]} zoom={9}
              className="map-container"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <HeatmapLayer
                points={heatmapData.data.map((point) => [
                  point.lat,
                  point.lng,
                  point.count,
                ])}
              />
              {geojsonData && <GeoJSON data={geojsonData} style={geoJsonStyle} />}
            </MapContainer>
          </div>
        </div>
        <div>
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
            {
            patients.map(ele => (
              <li key={ele.id}>
              <div className="w-[315px] mt-4 flex h-auto p-1 items-center">
                <div className="flex w-[75%]">
                  <div className="w-12 h-12 p-1 rounded-md bg-red-400 flex items-center justify-center font-bold text-lg font-montserrat">
                    {ele.infant_name.split(" ")[0][0] + ele.infant_name.split(" ")[1][0]}
                  </div>
                  <div className="ml-2  font-montserrat text-sm">
                    <p className="font-medium">{ele.infant_name}</p>
                    <p>{calculateMonth(ele.birth_date)}</p>
                  </div>
                </div>
                <div className="text-center w-[25%] font-montserrat text-sm">
                  {searchQuestionnaire(ele.id).result== true ? <p className="font-semibold text-blue-500">TEA</p>: <p className="font-semibold text-[#82ca9d]">NT</p>}
                  <p>Prob: {searchQuestionnaire(ele.id).probability}</p>
                </div>
              </div>
            </li>
            ))}
            
          </ul>
        </div>
        <div className="bg-white w-[340px] h-[480px]  mr-4 mb-4 rounded-md flex flex-col items-center">
          <div className="flex w-[95%] mt-3 justify-start items-center">
            <div className="bg-[#B1E5FC] rounded w-4 h-8"></div>
            <h2 className="font-montserrat font-semibold text-lg ml-2">
              Métricas importantes
            </h2>
          </div>
          <div className="w-100% h-[290px] border-[rgb(204,204,204)] p-4 pb-0 border-solid border-[1px] mt-4 rounded">
          <h5 className="font-montserrat text-sm font-semibold text-center">Distribución de Pacientes por Género</h5>
          <PieChart className="font-montserrat text-sm ml-7 outline-none" width={200} height={200}>
          <Pie className="outline-none"
            data={patientsByGender}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {patientsByGender.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="font-montserrat text-xs">
              <p className="font-semibold mb-1">Leyenda:</p>
              <div className="flex">
              <div className="flex items-center">
              <div className="w-4 h-4 bg-[#8884d8]"></div>
              <p className="ml-1">Femenino</p>
              </div>
              <div className="flex items-center">
              <div className="w-4 h-4 bg-[#82ca9d] ml-1"></div>
              <p className="ml-1">Masculino</p>
              </div>
              </div>
          </div>
          </div>
        </div>
        </div>
        
      </div>
    </section>
  );
}
