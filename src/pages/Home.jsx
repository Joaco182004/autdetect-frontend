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

export default function Home() {
  const [psychologists, setPsychologists] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isChart, setChart] = useState(true);
  const toggleClass = (state) => {
    if (isActive != state) {
      setIsActive(state);
      setChart(!state);
    }
  };
  const data = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i + 1).toLocaleString('es', { month: 'short' }),
    Cantidad_de_Diagnósticos: 1000 + i * 100
  }));

  const data2 = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i + 1).toLocaleString('es', { month: 'short' }),
    paciente_con_TEA: 2000 + i * 200,
    paciente_con_DT: 3400 + i * 100
  }));

  const data3 = [
    { name: "Femenino", value: 400 },
    { name: "Masculino", value: 200 },
  ];
  const classes = `w-1/2 h-[5.25rem] rounded-md absolute bg-white ${
    isActive ? "activeClassOne" : "activeClassTwo"
  }`;
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
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
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    async function loadPsychologist(){
      const res =await getAllPsychologist();
      setPsychologists(res.data)
      
    }
    loadPsychologist();
    
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
  
  const heatmapData = {
    max: 8,
    data: [
      { lat: -12.0464, lng: -77.0428, count: 200 },
      { lat: -12.040893, lng: -76.971087, count: 500 },
    ],
  };

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
  const geoJsonStyle = (feature) => {
    return {
      fillColor: 'red', // Colorea según una propiedad
      weight: 1,       // Grosor de la línea del borde
      opacity: 1,      // Opacidad de la línea del borde
      color: 'skyblue',  // Color de la línea del borde
      fillOpacity: 0.1 // Opacidad del relleno
    };
  };
  
  return (
    <section className="w-full h-full overflow-auto outline-none select-none">
      <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
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
              {isChart ? (
                <BarChart
                  className="mt-4 font-montserrat text-sm "
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
            {psychologists.map(ele => (
              <li key={ele.id}>
              <div className="w-[315px] mt-4 flex h-auto p-1 items-center">
                <div className="flex w-[75%]">
                  <div className="w-12 h-12 p-1 rounded-md bg-red-400 flex items-center justify-center font-bold text-lg font-montserrat">
                    JD
                  </div>
                  <div className="ml-2  font-montserrat text-sm">
                    <p className="font-medium">{ele.full_name}</p>
                    <p>18 años</p>
                  </div>
                </div>
                <div className="text-center w-[25%] font-montserrat text-sm">
                  <p className="font-semibold text-blue-500">TEA</p>
                  <p>Prob: 85%</p>
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
            data={data3}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data3.map((entry, index) => (
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
