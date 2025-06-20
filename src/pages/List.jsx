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
import {
  Input,
  DateInput,
  Select,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react"; // Asegúrate de importar correctamente todos los componentes
import {
  getAllPatients,
  savePatient,
  getPatientById,
  savePatientById,
} from "../api/infantPatient.api";
import { downloadPatients } from "../api/custom.api";
import { es } from "date-fns/locale";
import "../pages/style.css";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { parseDate } from "@internationalized/date";
import { ToastContainer, toast } from "react-toastify";
import { set } from "date-fns/set";
export default function List() {
  const [isEditable, setIsEditable] = useState(false);
  const [textform, setTextForm] = useState("");
  const [id, setId] = useState("");
  const [errorsIdentifier, setErrorsIdentifier] = useState("");
  async function loadPatients() {
    const res = await getAllPatients();
    const data_final = [];
    res.data.map((e) => {
      e.edit = (
        <div
          onClick={() => {
            getPatient(e);
          }}
          className="flex justify-center items-center cursor-pointer text-blue-600"
        >
          <PencilSquareIcon className="w-[20px] "></PencilSquareIcon>
        </div>
      );
    });

    res.data.map((e) => {
      if (e.psychology == localStorage.getItem("idPsychology")) {
        console.log(e);
        data_final.push(e);
      }
    });
    setPatients(data_final);
  }
  async function getPatient(e) {
    setIsEditable(true);
    setId(Number(e.id));
    const res = await getPatientById(Number(e.id));
    console.log(res.data);
    openEdit(res.data);
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
  const rowsPerPage = 4;
  async function downloadPatientsReport() {
    try {
      await downloadPatients();
    } catch (e) {
      console.log(e);
    }
  }
  const validateFields = () => {
    let errors = [];
    setErrorsIdentifier("");
    if(infantDni == "" || infantDni == null){
      errors.push("- Debe completar el campo de DNI del paciente.");
    }
    if(infantName == "" || infantName == null){
      errors.push("- Debe completar el campo de nombre del paciente.");
    }
    if(birthDate == null){
      errors.push("- Debe completar el campo de fecha de nacimiento del paciente.");
    }
    if(gender == "" || gender == null){
      errors.push("- Debe completar el campo de género del paciente.");
    }
    if(guardianDni == "" || guardianDni == null){
      errors.push("- Debe completar el campo de DNI del tutor.");
    }
    if(guardianName == "" || guardianName == null){
      errors.push("- Debe completar el campo de nombre del tutor.");
    }
    if(guardianEmail == "" || guardianEmail == null){
      errors.push("- Debe completar el campo de correo electrónico del tutor.");
    }
    if(contactPhone == "" || contactPhone == null){
      errors.push("- Debe completar el campo de número de contacto.");
    }
    if(district == "" || district == null){
      errors.push("- Debe completar el campo de distrito.");
    }
    if (errors.length > 0) {
      console.log("Errores de validación:", errors);
      // Mostrar los errores en el estad
      setErrorsIdentifier(errors.join("\n"));
      return false;
    }

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const dniRegex = /^\d{8}$/;
    const phoneRegex = /^\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(infantName)) {
      errors.push("- El nombre del niño(a) no debe contener números.");
    }

    if (!dniRegex.test(infantDni)) {
      errors.push(
        "- El DNI del niño(a) debe tener exactamente 8 dígitos numéricos."
      );
    }

    if (!nameRegex.test(guardianName)) {
      errors.push("- El nombre del apoderado no debe contener números.");
    }

    if (!dniRegex.test(guardianDni)) {
      errors.push(
        "- El DNI del apoderado debe tener exactamente 8 dígitos numéricos."
      );
    }

    if (!emailRegex.test(guardianEmail)) {
      errors.push("- El correo electrónico del apoderado no es válido.");
    }

    if (!phoneRegex.test(contactPhone)) {
      errors.push(
        "- El número de contacto debe tener exactamente 9 dígitos numéricos."
      );
    }

    if (errors.length > 0) {
      console.log("Errores de validación:", errors);
      // Mostrar los errores en el estad
      setErrorsIdentifier(errors.join("\n"));
      return false;
    }

    return true;
  };
  const registerPatient = () => {
    if (!validateFields()) return;
    const user = {
      infant_dni: infantDni,
      infant_name: infantName,
      birth_date:
        birthDate["year"] + "-" + birthDate["month"] + "-" + birthDate["day"],
      gender: gender,
      guardian_dni: guardianDni,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
      contact_phone: contactPhone,
      district: district,
      psychology: localStorage.getItem("idPsychology"),
    };
    if (!isEditable) {
      savePatient(user)
        .then((response) => {
          onOpenChange(false); // Cerrar el modal después de registrar el paciente
          loadPatients();
        })
        .catch((error) => {
          console.error("There was an error saving the patient!", error);
        });
    } else {
      console.log(id);
      savePatientById(id, user)
        .then((response) => {
          onOpenChange(false); // Cerrar el modal después de registrar el paciente
          loadPatients();
        })
        .catch((error) => {
          console.error("There was an error saving the patient!", error);
        });
    }
  };
  const openEdit = (data) => {
    setErrorsIdentifier("");
    // Establecer los datos
    setTextForm("Editar paciente");
    setInfantDni(data.infant_dni);
    setInfantName(data.infant_name);
    const date = parseDate(data.birth_date);
    setBirthDate(date); // Asegúrate de que esto es lo que quieres
    setGender(data.gender);
    setGuardianDni(data.guardian_dni);
    setGuardianName(data.guardian_name);
    setGuardianEmail(data.guardian_email);
    setContactPhone(data.contact_phone);
    setDistrict(data.district);

    // Llama a abrir el modal
    onOpen(true);
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
      <h1 className="tracking-in-expand font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl max-w-425:text-3xl max-w-425:ml-4">
        Lista de pacientes
      </h1>
      <div className="h-[auto]  flex flex-col items-center mb-4  bg-white mx-8 max-w-650:mx-4 max-w-650:w-[95%] max-w-450:w-[100%] max-w-450:mx-0 max-w-450:rounded-none content-list rounded-md pb-4">
        <div className="w-[100%] flex items-center justify-between bg-red p-2 rounded-md my-4">
          <div className="flex justify-between items-center w-full">
            <Input
              isClearable
              type="text"
              label="Filtro"
              placeholder="Ingresa lo que buscas"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onClear={() => setFilter("")}
              className="w-[250px] outline-none ml-4  max-w-425:ml-2 font-montserrat max-w-500:w-[200px] max-w-395:text-xs"
            />
            <Button
              onClick={downloadPatientsReport}
              className="mr-4 h-[40px] w-[150px] max-w-425:w-[130px] max-w-395:w-[100px] max-w-395:h-[40px] max-w-395:text-wrap  max-w-425:text-xs  font-montserrat font-medium"
              color="primary"
            >
              Descargar
            </Button>
          </div>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            className="font-montserrat w-[400px] max-h-[550px] overflow-auto"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {textform}
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
                      <DateInput
                        className="mb-2"
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
                    {errorsIdentifier && (
                      <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-xs">
                        <ul>
                          {errorsIdentifier.split("\n").map((error, idx) => (
                            <li key={idx}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      type="button"
                      onClick={registerPatient}
                      color="primary"
                    >
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
          aria-label="Tabla de Pacientes"
          bottomContent={
            <div className="flex w-full justify-center">
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
