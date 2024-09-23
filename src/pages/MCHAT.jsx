import { React, useEffect, useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { savePatient } from "../api/infantPatient.api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import {
  saveQuestionnaire,
  getQuestionnaireById,
} from "../api/questionnaire.api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { getPatientById, getAllPatients } from "../api/infantPatient.api";
import { predictModelDiagnosis } from "../api/custom.api";
import {
  Input,
  DateInput,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { ToastContainer, toast } from "react-toastify";
import { sendEmailReport } from "../api/custom.api";
import "react-toastify/dist/ReactToastify.css";
export default function MCHAT() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [infantDni, setInfantDni] = useState("");
  const [infantName, setInfantName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");
  const [guardianDni, setGuardianDni] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selectPatients, setSelectPatients] = useState("");
  const [district, setDistrict] = useState("");
  const [q1, setQ1] = useState(1);
  const [q2, setQ2] = useState(1);
  const [q3, setQ3] = useState(1);
  const [q4, setQ4] = useState(1);
  const [q5, setQ5] = useState(1);
  const [q6, setQ6] = useState(1);
  const [q7, setQ7] = useState(1);
  const [q8, setQ8] = useState(1);
  const [q9, setQ9] = useState(1);
  const [q10, setQ10] = useState(0);
  const [q11, setQ11] = useState(0);
  const [q12, setQ12] = useState(0);
  const [view, setView] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientChoose, setPatientChoose] = useState(null);
  const [resultView, setResultView] = useState(false);
  const [result, setResult] = useState([]);
  const [idTest, setIdTest] = useState(0);
  const [questionnaireView, setquestionnaireView] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;
  async function sendEmailCode() {
    console.log("Hola");
    const data = {
      id_test: view ? localStorage.getItem("questionnaires") : idTest,
    };
    try {
      await sendEmailReport(data);
      toast.success("Correo enviado correctamente al padre de familia.", {
        position: "bottom-center",
        style: {
          width: 420,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } catch (e) {
      toast.error(
        "Hubo un error al enviar el correo. Por favor, vuelva intentarlo.",
        {
          position: "bottom-center",
          style: {
            width: 470,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        }
      );
    }
  }
  const truncarDecimales = (num, decimales) => {
    const factor = Math.pow(10, decimales);
    return Math.floor(num * factor) / factor;
  };
  async function getPatient(id) {
    const user = await getPatientById(id);
    return user.data;
  }
  async function getPatients() {
    const users = await getAllPatients();
    setPatients(users.data);
  }
  async function getQuestionnaire(id) {
    const questionnaire = await getQuestionnaireById(id);
    return questionnaire.data;
  }

  const registerEvaluation = async (prediction) => {
    const user = {
      infant_dni: infantDni,
      infant_name: infantName,
      birth_date: `${birthDate["year"]}-${String(birthDate["month"]).padStart(
        2,
        "0"
      )}-${String(birthDate["day"]).padStart(2, "0")}`,
      gender: gender,
      guardian_dni: guardianDni,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
      contact_phone: contactPhone,
      district: district,
      psychology: localStorage.getItem("idPsychology"),
    };

    try {
      let patientId = "";
      let msg = "";
      const existingPatient = patients.find(
        (paciente) => paciente.infant_dni === infantDni
      );

      if (!existingPatient) {
        try {
          const patientResponse = await savePatient(user);
          console.log("Patient saved successfully", patientResponse.data);
          patientId = patientResponse.data.id;
          msg =
            "Se registro exitosamente la evaluación y el paciente evaluado.";
        } catch (error) {
          console.error("Error saving patient", error);
        }
      } else {
        patientId = existingPatient.id;
        msg =
          "Se registro exitosamente la evaluación. El paciente ya ha se encuentra registado.";
      }
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10);
      const questionnaire = {
        patient: patientId,
        pregunta_1: q1,
        pregunta_2: q2,
        pregunta_3: q3,
        pregunta_4: q4,
        pregunta_5: q5,
        pregunta_6: q6,
        pregunta_7: q7,
        pregunta_8: q8,
        pregunta_9: q9,
        pregunta_10: q10,
        ictericia: q11,
        familiar_con_tea: q12,
        result: prediction.prediccion,
        probability: prediction.probabilidad,
        date_evaluation: formattedDate,
      };

      const questionnaireResponse = await saveQuestionnaire(questionnaire);
      toast.success(msg, {
        position: "bottom-center",
        style: {
          width: 470,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
      setIdTest(questionnaireResponse.data.id);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  async function changePatient(id) {
    const userFind = await getPatient(id);
    setInfantDni(userFind.infant_dni);
    setInfantName(userFind.infant_name);
    const date = parseDate(userFind.birth_date);
    setBirthDate(date);
    setGender(userFind.gender);
    setGuardianDni(userFind.guardian_dni);
    setGuardianName(userFind.guardian_name);
    setGuardianEmail(userFind.guardian_email);
    setContactPhone(userFind.contact_phone);
    setDistrict(userFind.district);
  }
  function cleanFields() {
    setSelectPatients([]);
    setInfantDni();
    setInfantName();
    setBirthDate(); // Asegúrate de que esto es lo que quieres
    setGender();
    setGuardianDni();
    setGuardianName();
    setGuardianEmail();
    setContactPhone();
    setDistrict();
    setPatientChoose();
  }
  async function predictionModel() {
    if (
      !infantDni ||
      !infantName ||
      !birthDate ||
      !gender ||
      !guardianDni ||
      !guardianName ||
      !guardianEmail ||
      !contactPhone ||
      !district
    ) {
      toast.error("Debe completar todos los campos.", {
        position: "bottom-center",
        style: {
          width: 320,
          fontSize: "0.85rem",
          fontFamily: "Montserrat",
        },
      });
    } else {
      const answers = {
        pregunta_1: q1,
        pregunta_2: q2,
        pregunta_3: q3,
        pregunta_4: q4,
        pregunta_5: q5,
        pregunta_6: q6,
        pregunta_7: q7,
        pregunta_8: q8,
        pregunta_9: q9,
        pregunta_10_Cociente_Espectro_Autista: q10,
        Sexo: gender == "M" ? 1 : 0,
        Ictericia: q11,
        Familiar_con_TEA: q12,
      };
      const predict = await predictModelDiagnosis(answers);
      setResultView(true);
      setResult(predict.data);
      registerEvaluation(predict.data);
    }
  }
  useEffect(() => {
    getPatients();
    const fetchData = async () => {
      if (localStorage.getItem("questionnaires") != null) {
        setView(true);
        try {
          const questionnaireFind = await getQuestionnaire(
            localStorage.getItem("questionnaires")
          );
          setquestionnaireView(questionnaireFind);
          setQ1(questionnaireFind.pregunta_1);
          setQ2(questionnaireFind.pregunta_2);
          setQ3(questionnaireFind.pregunta_3);
          setQ4(questionnaireFind.pregunta_4);
          setQ5(questionnaireFind.pregunta_5);
          setQ6(questionnaireFind.pregunta_6);
          setQ7(questionnaireFind.pregunta_7);
          setQ8(questionnaireFind.pregunta_8);
          setQ9(questionnaireFind.pregunta_9);
          setQ10(questionnaireFind.pregunta_10);
          setQ11(questionnaireFind.ictericia);
          setQ12(questionnaireFind.familiar_con_tea);
          try {
            const userFind = await getPatient(questionnaireFind.patient);
            setInfantDni(userFind.infant_dni);
            setInfantName(userFind.infant_name);
            const date = parseDate(userFind.birth_date);
            setBirthDate(date); // Asegúrate de que esto es lo que quieres
            setGender(userFind.gender);
            setGuardianDni(userFind.guardian_dni);
            setGuardianName(userFind.guardian_name);
            setGuardianEmail(userFind.guardian_email);
            setContactPhone(userFind.contact_phone);
            setDistrict(userFind.district);
            setPatientChoose(userFind);
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setView(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <section className="w-full h-full overflow-auto max-w-395:overflow-x-hidden outline-none select-none">
      {!resultView ? (
        <>
          <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl max-w-680:text-3xl max-w-570:text-2xl max-w-470:text-xl max-w-425:ml-[1rem]">
            Cuesitonario de comportamiento
          </h1>
          <div className=" flex-col ml-8 bg-white flex p-2 rounded-md my-4 mchat-content pl-4 max-w-425:ml-4 max-w-425:w-[90%]">
            <h2 className="mb-4 mt-2 font-montserrat font-semibold text-xl">
              {!view ? "Registro del paciente" : "Paciente Evaluado"}
            </h2>
            {!view && (
              <p className="font-montserrat text-sm w-full mb-4 text-justify pr-4">
                Debe completar todos los campos para el registro y evaluación
                del paciente. Si el paciente ya se encuentra registrado en el
                sistema, puede seleccionarlo en el primer campo. De lo
                contrario, deberá completar todos los campos requeridos para
                registrar al nuevo paciente.
              </p>
            )}

            <form className="w-[350px]">
              {!view && (
                <>
                  <Select
                    variant="bordered"
                    label="Paciente Registrado"
                    placeholder="Selecciona un paciente"
                    className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
                    onChange={(e) => {
                      changePatient(e.target.value);
                      setSelectPatients(e.target.value);
                    }}
                    selectedKeys={[selectPatients]}
                  >
                    {patients.map((patient) => (
                      <SelectItem className="font-montserrat" key={patient.id}>
                        {patient.infant_dni + " - " + patient.infant_name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button
                    className="font-montserrat mb-2 font-semibold"
                    color="primary"
                    onClick={cleanFields}
                  >
                    Limpiar
                  </Button>
                </>
              )}
              <Input
                isReadOnly={view}
                label="DNI del paciente"
                placeholder="Ingrese el DNI del paciente"
                value={infantDni}
                onChange={(e) => setInfantDni(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />
              <Input
                isReadOnly={view}
                label="Nombre del paciente"
                placeholder="Ingrese el nombre del paciente"
                value={infantName}
                onChange={(e) => setInfantName(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />

              <Select
                variant="bordered"
                label="Género del paciente"
                placeholder="Seleccione el género del paciente"
                selectedKeys={[gender]}
                onChange={(e) => setGender(e.target.value)}
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              >
                {[
                  { key: "M", label: "Masculino" },
                  { key: "F", label: "Femenino" },
                ].map((gender) => (
                  <SelectItem
                    isReadOnly={view}
                    className="font-montserrat"
                    key={gender.key}
                    value={gender.key}
                  >
                    {gender.label}
                  </SelectItem>
                ))}
              </Select>
              <DateInput
                isReadOnly={view}
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
                variant="bordered"
                label="Fecha de nacimiento del paciente"
                value={birthDate}
                onChange={setBirthDate}
              />
              <Input
                isReadOnly={view}
                label="DNI del tutor"
                placeholder="Ingrese el DNI del tutor"
                value={guardianDni}
                onChange={(e) => setGuardianDni(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />
              <Input
                isReadOnly={view}
                label="Nombre del tutor"
                placeholder="Ingrese el nombre completo del tutor"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />
              <Input
                isReadOnly={view}
                label="Correo de contacto"
                placeholder="Ingrese el correo de contacto"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />
              <Input
                isReadOnly={view}
                label="Número de contacto"
                placeholder="Ingrese el número de contacto"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                variant="bordered"
                className="mb-2 font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
              />
              <Select
                className="font-montserrat max-w-470:w-[90%] max-w-395:w-[85%]"
                variant="bordered"
                label="Distrito"
                placeholder="Seleccione el distrito"
                selectedKeys={[district]}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {distritosLimaMetropolitana.map((district) => (
                  <SelectItem
                    isReadOnly={view}
                    className="font-montserrat"
                    key={district.key}
                    value={district.label}
                  >
                    {district.label}
                  </SelectItem>
                ))}
              </Select>
            </form>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    1
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Responde tu hijo(a) cuando lo(a) llamas por su nombre, como
                    volteándose, hablándote o dejando de hacer lo que estaba
                    haciendo?
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q1}
                onValueChange={setQ1}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    2
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Te mira tu hijo(a) a los ojos cuando le hablas, juegas con
                    él/ella, o lo(a) vistes?
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q2}
                onValueChange={setQ2}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    3
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Tu hijo(a) señala con el dedo o la mano cuando quiere algo
                    o necesita ayuda, como un juguete o comida que no puede
                    alcanzar?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q3}
                onValueChange={setQ3}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    4
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Alguna vez tu hijo(a) señala algo que le causa interés solo
                    para mostrarte, como un avión en el cielo o un animal?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q4}
                onValueChange={setQ4}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    5
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Tu hijo(a) juega a hacer cosas como beber de una taza de
                    juguete, hablar por teléfono, o darle de comer a una muñeca
                    o peluche?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q5}
                onValueChange={setQ5}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    6
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    Si te giras a ver algo, ¿tu hijo(a) trata de mirar hacia lo
                    que estás mirando?
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q6}
                onValueChange={setQ6}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    7
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    Si tú o alguien más en la familia está visiblemente triste o
                    molesto, ¿tu hijo(a) muestra signos de querer consolarlo?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q7}
                onValueChange={setQ7}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    8
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Tu hijo(a) dijo sus primeras palabras (como "mamá" o "papá")
                    alrededor del primer año de vida?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q8}
                onValueChange={setQ8}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    9
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Usa tu hijo(a) gestos como decir adiós con la mano,
                    aplaudir, o imitar algún sonido gracioso que haces?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q9}
                onValueChange={setQ9}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={0}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={1}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    10
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Ha notado que su hijo(a) se queda mirando un objeto o al vacío
                    durante un tiempo prolongado, sin parecer darse cuenta de lo
                    que ocurre a su alrededor?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q10}
                onValueChange={setQ10}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={1}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={0}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    11
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Tu hijo(a) ha presentado alguna vez ictericia, es decir, un
                    tono amarillento en la piel o en los ojos, especialmente
                    poco después de nacer?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q11}
                onValueChange={setQ11}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={1}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={0}>
                  No
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <div className="flex  w-full mt-6">
                <div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center font-montserrat font-semibold text-white">
                    12
                  </div>
                </div>
                <div>
                  <p className="ml-2 mr-2 font-montserrat text-sm">
                    ¿Hay algún familiar en tu familia que haya sido
                    diagnosticado con Trastorno del Espectro Autista (TEA)?{" "}
                  </p>
                </div>
              </div>
              <RadioGroup
                label="Seleccione la respuesta"
                orientation="horizontal"
                className="font-montserrat text-sm ml-7 mt-2"
                value={q12}
                onValueChange={setQ12}
                isReadOnly={view}
              >
                <Radio className="text-xs" value={1}>
                  Sí
                </Radio>
                <Radio className="text-xs" value={0}>
                  No
                </Radio>
              </RadioGroup>
            </div>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
              className="font-montserrat z-50"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Enviar Reporte
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Desea enviar el reporte por correo al padre de familia?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          sendEmailCode();
                          onClose();
                        }}
                        color="primary"
                      >
                        Aceptar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            {view && (
              <>
                <h2 className="mb-4 mt-4 font-montserrat font-semibold text-base bg-blue-500 w-fit p-2 rounded-full text-white">
                  Resultados de la Evaluación
                </h2>
                <Table
                  aria-label="Example static collection table"
                  className="font-montserrat w-[75%]"
                >
                  <TableHeader className="font-semibold">
                    <TableColumn>DNI</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Fecha de Nacimiento</TableColumn>
                    <TableColumn>Fecha de Evaluación</TableColumn>
                    <TableColumn>Resultado</TableColumn>
                    <TableColumn>Probabilidad</TableColumn>
                  </TableHeader>
                  <TableBody className="font-medium">
                    <TableRow key="1">
                      <TableCell>{infantDni}</TableCell>
                      <TableCell>{infantName}</TableCell>
                      <TableCell>
                        {birthDate
                          ? `${birthDate["year"]}-${String(
                              birthDate["month"]
                            ).padStart(2, "0")}-${String(
                              birthDate["day"]
                            ).padStart(2, "0")}`
                          : 0}
                      </TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>
                        {questionnaireView
                          ? questionnaireView.result
                            ? questionnaireView.result === true
                              ? "Positivo"
                              : "Negativo"
                            : "Negativo"
                          : 0}
                      </TableCell>
                      <TableCell>
                        {questionnaireView.probability
                          ? truncarDecimales(questionnaireView.probability * 100, 2).toString() + "%"
                          : 0}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
            <div className="mt-8 flex">
              {!view ? (
                <>
                  <Button
                    className="w-[150px] font-montserrat font-medium"
                    color="primary"
                    onClick={predictionModel}
                  >
                    Predecir
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/app/evaluaciones/");
                    }}
                    className="ml-2 w-[150px] font-montserrat font-medium"
                    color="default"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-[150px] font-montserrat font-medium"
                    color="primary"
                    onClick={onOpen}
                  >
                    Enviar Reporte
                  </Button>
                  <Button
                    className="ml-4 w-[150px] font-montserrat font-medium"
                    color="default"
                    onClick={() => {
                      navigate("/app/evaluaciones/");
                    }}
                  >
                    Cerrar
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl max-w-680:text-3xl max-w-570:text-2xl max-w-470:text-xl max-w-425:ml-[1rem]">
            Cuesitonario de comportamiento
          </h1>
          <div className=" flex-col ml-8 bg-white flex p-2 rounded-md my-4 mchat-content pl-4 max-w-425:ml-4 max-w-425:w-[90%]">
            <h2 className="mb-4 mt-2 font-montserrat font-semibold text-xl">
              Resultado de la Evaluación
            </h2>
            <Table
              aria-label="Example static collection table"
              className="font-montserrat"
            >
              <TableHeader className="font-semibold">
                <TableColumn>DNI</TableColumn>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Fecha de Nacimiento</TableColumn>
                <TableColumn>Fecha de Evaluación</TableColumn>
                <TableColumn>Resultado</TableColumn>
                <TableColumn>Probabilidad</TableColumn>
              </TableHeader>
              <TableBody className="font-medium">
                <TableRow key="1">
                  <TableCell>{infantDni}</TableCell>
                  <TableCell>{infantName}</TableCell>
                  <TableCell>{`${birthDate["year"]}-${String(
                    birthDate["month"]
                  ).padStart(2, "0")}-${String(birthDate["day"]).padStart(
                    2,
                    "0"
                  )}`}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>
                    {result
                      ? result.prediccion
                        ? result.prediccion === 1
                          ? "Positivo"
                          : "Negativo"
                        : "Negativo"
                      : 0}
                  </TableCell>
                  <TableCell>
                    {result ? truncarDecimales(result.probabilidad * 100, 2).toString() + "%" : 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
              className="font-montserrat z-50"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Enviar Reporte
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Desea enviar el reporte por correo al padre de familia?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          sendEmailCode();
                          onClose();
                        }}
                        color="primary"
                      >
                        Aceptar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div className="mt-4">
              <Button
                className="w-[150px] font-montserrat font-medium"
                color="primary"
                onClick={onOpen}
              >
                Enviar Reporte
              </Button>
              <Button
                className="ml-4 w-[150px] font-montserrat font-medium"
                color="default"
                onClick={() => {
                  navigate("/app/evaluaciones/");
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </section>
  );
}
