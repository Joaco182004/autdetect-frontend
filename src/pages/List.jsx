import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { Input, DateInput, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"; // Asegúrate de importar correctamente todos los componentes
import { getAllPatients, savePatient } from "../api/infantPatient.api";
import { es } from "date-fns/locale";
import "../pages/style.css";
import {
  PencilSquareIcon
} from "@heroicons/react/24/solid";
export default function List() {
  const [idEditable, setIdEditable] = useState("");
  const getId=(e)=>{
    console.log(e.id)
    setIdEditable(e.id)
  }
  async function loadPatients() {
    const res = await getAllPatients();
    
    res.data.map(e => { e.edit = <div onClick={()=>{getId(e)}} className="flex justify-center items-center cursor-pointer text-blue-600"><PencilSquareIcon className="w-[20px] "></PencilSquareIcon></div>})
    
    setPatients(res.data);
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    
    loadPatients();
  }, []);
  
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

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const rowsPerPage = 6;

  const registerPatient = () => {
    
    const user = {
      infant_dni: infantDni,
      infant_name: infantName,
      birth_date: birthDate["year"]+"-"+birthDate["month"] + "-"+ birthDate["day"],
      gender:gender,
      guardian_dni: guardianDni,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
      contact_phone: contactPhone,
      district: district,
    };
    console.log(user)
    savePatient(user)
      .then((response) => {
        console.log("Patient saved successfully", response.data);
        onOpenChange(false); // Cerrar el modal después de registrar el paciente
        loadPatients();
      })
      .catch((error) => {
        console.error("There was an error saving the patient!", error);
      });
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.infant_dni.toLowerCase().includes(filter.toLowerCase()) ||
        patient.guardian_name.toLowerCase().includes(filter.toLowerCase()) ||
        patient.infant_name.toLowerCase().includes(filter.toLowerCase()) ||
        patient.contact_phone.toLowerCase().includes(filter.toLowerCase()) ||
        patient.guardian_email.toLowerCase().includes(filter.toLowerCase()) ||
        patient.birth_date.toLowerCase().includes(filter.toLowerCase()) ||
        patient.gender.toLowerCase().includes(filter.toLowerCase()) ||
        patient.district.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, patients]);

  const pages = Math.ceil(filteredPatients.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredPatients.slice(start, end);
  }, [page, filteredPatients]);

  return (
    <section className="tracking-in-expand2 bg-[#f4f4f4]  w-full h-[full] overflow-x-hidden outline-none select-none ">
      <h1 className="tracking-in-expand font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Lista de pacientes
      </h1>
      <div className="h-[auto]  flex flex-col items-center mb-4  bg-white mx-8 content-list rounded-md pb-4">
        <div className="w-[100%] flex items-center justify-between bg-red p-2 rounded-md my-4">
          <Input
            isClearable
            type="text"
            label="Filtro"
            placeholder="Ingresa lo que buscas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onClear={() => setFilter("")}
            className="w-[250px] outline-none ml-4 font-montserrat"
          />
          <Button
            onPress={onOpen}
            className="mr-4 h-[40px] w-[150px] font-montserrat font-medium"
            color="primary"
            variant="solid"
          >
            Agregar Paciente
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="font-montserrat w-[400px] max-h-[550px] overflow-auto"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Registro de paciente
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <Input
                        label="DNI del paciente"
                        placeholder="Ingrese el DNI del paciente"
                        value={infantDni}
                        onChange={(e) => setInfantDni(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      <Input
                        label="Nombre del paciente"
                        placeholder="Ingrese el nombre del paciente"
                        value={infantName}
                        onChange={(e) => setInfantName(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      
                      <Select
                        variant="bordered"
                        label="Género del paciente"
                        placeholder="Seleccione el género del paciente"
                        selectedKeys={[gender]}
                        
                        onChange={(e) => setGender(e.target.value)}
                        className="mb-2"
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
                      <DateInput className="mb-2"
                      variant="bordered"
                      label="Fecha de nacimiento del paciente"
                      value={birthDate} onChange={setBirthDate}
                    />
                      <Input
                        label="DNI del tutor"
                        placeholder="Ingrese el DNI del tutor"
                        value={guardianDni}
                        onChange={(e) => setGuardianDni(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      <Input
                        label="Nombre del tutor"
                        placeholder="Ingrese el nombre completo del tutor"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      <Input
                        label="Correo de contacto"
                        placeholder="Ingrese el correo de contacto"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      <Input
                        label="Número de contacto"
                        placeholder="Ingrese el número de contacto"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        variant="bordered"
                        className="mb-2"
                      />
                      <Select
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
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button type="button" onClick={registerPatient} color="primary">
                      Registrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Table
          className="width-content rounded-2xl border-1 font-montserrat"
          bottomContent={
            <div  className=" flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn className="text-xs" key="id">
              {" "}
              <span className="  flex justify-center text-center">Id </span>
            </TableColumn>
            <TableColumn className="text-xs" key="infant_dni">
              {" "}
              <span className="  flex justify-center text-center">
                DNI <br></br>del Paciente
              </span>
            </TableColumn>
            <TableColumn className="text-xs" key="infant_name">
              {" "}
              <span className=" flex justify-center text-center">
                Nombre <br></br>del Paciente
              </span>
            </TableColumn>
            <TableColumn key="birth_date">
              <span className=" flex justify-center text-center">
                Fecha de <br></br> Nacimiento
              </span>
            </TableColumn>
            <TableColumn key="gender">
              <span className=" flex justify-center text-center">Género</span>
            </TableColumn>
            <TableColumn key="guardian_dni">
              <span className=" flex justify-center text-center">
                DNI <br></br> del Tutor
              </span>
            </TableColumn>
            <TableColumn key="guardian_name">
              <span className=" flex justify-center text-center">
                Nombre <br></br> del Tutor
              </span>
            </TableColumn>
            <TableColumn key="contact_phone">
              <span className=" flex justify-center text-center">
                Teléfono <br></br> de Contacto
              </span>
            </TableColumn>
            <TableColumn key="guardian_email">
              <span className=" flex justify-center text-center">
                Correo <br></br> Electrónico
              </span>
            </TableColumn>
            <TableColumn key="district">
              <span className=" flex justify-center text-center">Distrito</span>
            </TableColumn>
            <TableColumn key="edit">
              <span className=" flex justify-center text-center">Edición</span>
            </TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell className="text-xs text-center">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                    
                )}
              
              </TableRow>
              
            )}
           
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
