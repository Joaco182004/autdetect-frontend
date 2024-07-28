import { React, useEffect, useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../api/infantPatient.api";
import {
  Input,
  DateInput,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
export default function MCHAT() {
  const [infantDni, setInfantDni] = useState("");
  const [infantName, setInfantName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");
  const [guardianDni, setGuardianDni] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [district, setDistrict] = useState("");
  const distritosLimaMetropolitana = [
    { key: "Ancón", label: "Ancón" },
    { key: "Ate", label: "Ate" },
    { key: "Barranco", label: "Barranco" },
    { key: "Breña", label: "Breña" },
    { key: "Carabayllo", label: "Carabayllo" },
    { key: "Chaclacayo", label: "Chaclacayo" },
    { key: "Chorrillos", label: "Chorrillos" },
    { key: "Cieneguilla", label: "Cieneguilla" },
    { key: "Comas", label: "Comas" },
    { key: "El Agustino", label: "El Agustino" },
    { key: "Independencia", label: "Independencia" },
    { key: "Jesús María", label: "Jesús María" },
    { key: "La Molina", label: "La Molina" },
    { key: "La Victoria", label: "La Victoria" },
    { key: "Lima", label: "Lima" },
    { key: "Lince", label: "Lince" },
    { key: "Los Olivos", label: "Los Olivos" },
    { key: "Lurigancho-Chosica", label: "Lurigancho-Chosica" },
    { key: "Lurín", label: "Lurín" },
    { key: "Magdalena del Mar", label: "Magdalena del Mar" },
    { key: "Miraflores", label: "Miraflores" },
    { key: "Pachacámac", label: "Pachacámac" },
    { key: "Pucusana", label: "Pucusana" },
    { key: "Pueblo Libre", label: "Pueblo Libre" },
    { key: "Puente Piedra", label: "Puente Piedra" },
    { key: "Punta Hermosa", label: "Punta Hermosa" },
    { key: "Punta Negra", label: "Punta Negra" },
    { key: "Rímac", label: "Rímac" },
    { key: "San Bartolo", label: "San Bartolo" },
    { key: "San Borja", label: "San Borja" },
    { key: "San Isidro", label: "San Isidro" },
    { key: "San Juan de Lurigancho", label: "San Juan de Lurigancho" },
    { key: "San Juan de Miraflores", label: "San Juan de Miraflores" },
    { key: "San Luis", label: "San Luis" },
    { key: "San Martín de Porres", label: "San Martín de Porres" },
    { key: "San Miguel", label: "San Miguel" },
    { key: "Santa Anita", label: "Santa Anita" },
    { key: "Santa María del Mar", label: "Santa María del Mar" },
    { key: "Santa Rosa", label: "Santa Rosa" },
    { key: "Santiago de Surco", label: "Santiago de Surco" },
    { key: "Surquillo", label: "Surquillo" },
    { key: "Villa El Salvador", label: "Villa El Salvador" },
    { key: "Villa María del Triunfo", label: "Villa María del Triunfo" },
  ];
  const [patients, setPatients] = useState([]);
  const [patientsEvaluation,setPatientsEvaluation] = useState([])
  async function loadPatients() {
    const res = await getAllPatients();
    res.data()
    setPatients(res.data);
  }
  useEffect(() => {
    loadPatients();
  }, []);
  const navigate = useNavigate();
  return (
    <section className="w-full h-full overflow-auto outline-none select-none">
      <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Cuesitonario de comportamiento
      </h1>
      <div className=" flex-col ml-8 bg-white flex p-2 rounded-md my-4 mchat-content pl-4">
        <form className="w-[350px]">
          <h2 className="mb-4 mt-2 font-montserrat font-semibold text-xl">Registro del paciente</h2>
          <Input
            
            label="DNI del paciente"
            placeholder="Ingrese el DNI del paciente"
            value={infantDni}
            onChange={(e) => setInfantDni(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />
          <Input
            label="Nombre del paciente"
            placeholder="Ingrese el nombre del paciente"
            value={infantName}
            onChange={(e) => setInfantName(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />

          <Select
            variant="bordered"
            label="Género del paciente"
            placeholder="Seleccione el género del paciente"
            selectedKeys={[gender]}
            onChange={(e) => setGender(e.target.value)}
            className="mb-2 font-montserrat"
          >
            {[
              { key: "M", label: "Masculino" },
              { key: "F", label: "Femenino" },
            ].map((gender) => (
              <SelectItem
                className="font-montserrat"
                key={gender.key}
                value={gender.key}
              >
                {gender.label}
              </SelectItem>
            ))}
          </Select>
          <DateInput
            className="mb-2 font-montserrat"
            variant="bordered"
            label="Fecha de nacimiento del paciente"
            value={birthDate}
            onChange={setBirthDate}
          />
          <Input
            label="DNI del tutor"
            placeholder="Ingrese el DNI del tutor"
            value={guardianDni}
            onChange={(e) => setGuardianDni(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />
          <Input
            label="Nombre del tutor"
            placeholder="Ingrese el nombre completo del tutor"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />
          <Input
            label="Correo de contacto"
            placeholder="Ingrese el correo de contacto"
            value={guardianEmail}
            onChange={(e) => setGuardianEmail(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />
          <Input
            label="Número de contacto"
            placeholder="Ingrese el número de contacto"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            variant="bordered"
            className="mb-2 font-montserrat"
          />
          <Select
            className="font-montserrat"
            variant="bordered"
            label="Distrito"
            placeholder="Seleccione el distrito"
            selectedKeys={[district]}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {distritosLimaMetropolitana.map((district) => (
              <SelectItem
                className="font-montserrat"
                key={district.key}
                value={district.label}
              >
                {district.label}
              </SelectItem>
            ))}
          </Select>
        </form>
        <div className="flex mt-6">
          <div className="w-6 h-6 bg-blue-500 flex justify-center items-center font-montserrat font-semibold text-white">
            1
          </div>
          <p className="ml-2 mr-2 font-montserrat text-sm">
            Si usted señala algo al otro lado de la habitación, ¿su hijo/a lo
            mira? (POR EJEMPLO, Si usted señala a un juguete, un peluche o un
            animal, ¿su hijo/a lo mira?)
          </p>
        </div>
        <RadioGroup
          label="Seleccione la respuesta"
          orientation="horizontal"
          className="font-montserrat text-sm ml-7 mt-2"
        >
          <Radio className="text-xs" value="1">
            Sí
          </Radio>
          <Radio className="text-xs" value="0">
            No
          </Radio>
        </RadioGroup>
        <div className="flex mt-6">
          <div className="w-6 h-6 bg-blue-500 flex justify-center items-center font-montserrat font-semibold text-white">
            2
          </div>
          <p className="ml-2 mr-2 font-montserrat text-sm">
            Si usted señala algo al otro lado de la habitación, ¿su hijo/a lo
            mira? (POR EJEMPLO, Si usted señala a un juguete, un peluche o un
            animal, ¿su hijo/a lo mira?)
          </p>
        </div>
        <RadioGroup
          label="Seleccione la respuesta"
          orientation="horizontal"
          className="font-montserrat text-sm ml-7 mt-2"
        >
          <Radio className="text-xs" value="1">
            Sí
          </Radio>
          <Radio className="text-xs" value="0">
            No
          </Radio>
        </RadioGroup>
        <div className="mt-8 flex">
          <Button
            className="w-[150px] font-montserrat font-medium"
            color="primary"
          >
            Predecir
          </Button>
          <Button
            onClick={() => {
              navigate("/app/evaluaciones");
            }}
            className="ml-2 w-[150px] font-montserrat font-medium"
            color="default"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </section>
  );
}
