import { React, useEffect, useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { savePatient } from "../api/infantPatient.api";
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

  async function sendEmailCode() {
    const data = {
      name_father: patientChoose.guardian_name,
      email: patientChoose.guardian_email,
      patient: patientChoose.infant_name,
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
  const transformText = (text) => {
    return text == true ? 1 : 0;
  };
  async function predictionModel() {
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
      Sexo: 1,
      Ictericia: q11,
      Familiar_con_TEA: q12,
    };
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
          console.log(questionnaireFind);

          setQ1(transformText(questionnaireFind.question_1));
          setQ2(transformText(questionnaireFind.question_2));
          try {
            const userFind = await getPatient(questionnaireFind.id);
            console.log(userFind);
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
  const transformValue = (value) => {
    return value == 1 ? true : false;
  };
  const registerEvaluation = async () => {
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
      const arrayDni = [];
      patients.map((e) => {
        arrayDni.push(e.infant_dni);
      });
      if (arrayDni.includes(infantDni)) {
        toast.error("Este paciente ya ha sido registrado.", {
          position: "bottom-center",
          style: {
            width: 320,
            fontSize: "0.85rem",
            fontFamily: "Montserrat",
          },
        });
      } else {
        const user = {
          infant_dni: infantDni,
          infant_name: infantName,
          birth_date: `${birthDate["year"]}-${String(
            birthDate["month"]
          ).padStart(2, "0")}-${String(birthDate["day"]).padStart(2, "0")}`,
          gender: gender,
          guardian_dni: guardianDni,
          guardian_name: guardianName,
          guardian_email: guardianEmail,
          contact_phone: contactPhone,
          district: district,
          psychology: localStorage.getItem("idPsychology"),
        };

        try {
          const patientResponse = await savePatient(user);
          console.log("Patient saved successfully", patientResponse.data);
          const patientId = patientResponse.data.id;

          const today = new Date();
          const formattedDate = today.toISOString().slice(0, 10);
          const questionnaire = {
            patient: patientId,
            question_1: q1,
            question_2: q2,
            result: true,
            probability: 0.9,
            date_evaluation: formattedDate,
          };
          const questionnaireResponse = await saveQuestionnaire(questionnaire);
          console.log(
            "Questionnaire saved successfully",
            questionnaireResponse.data
          );
          navigate("/app/evaluaciones/");
        } catch (error) {
          console.error("There was an error!", error);
        }
      }
    }
  };
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

  const navigate = useNavigate();
  return (
    <section className="w-full h-full overflow-auto max-w-395:overflow-x-hidden outline-none select-none">
      <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl max-w-680:text-3xl max-w-570:text-2xl max-w-470:text-xl max-w-425:ml-[1rem]">
        Cuesitonario de comportamiento
      </h1>
      <div className=" flex-col ml-8 bg-white flex p-2 rounded-md my-4 mchat-content pl-4 max-w-425:ml-4 max-w-425:w-[90%]">
        <form className="w-[350px]">
          <h2 className="mb-4 mt-2 font-montserrat font-semibold text-xl">
            {!view ? "Registro del paciente" : "Paciente Evaluado"}
          </h2>
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
                ¿Tu hijo(a) señala con el dedo o la mano cuando quiere algo o
                necesita ayuda, como un juguete o comida que no puede alcanzar?{" "}
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
                juguete, hablar por teléfono, o darle de comer a una muñeca o
                peluche?{" "}
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
                Si te giras a ver algo, ¿tu hijo(a) trata de mirar hacia lo que
                estás mirando?
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
                molesto, ¿tu hijo muestra signos de querer consolarlo?{" "}
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
                ¿Tu hijo dijo sus primeras palabras (como "mamá" o "papá")
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
                ¿Usa tu hijo(a) gestos como decir adiós con la mano, aplaudir, o
                imitar algún sonido gracioso que haces?{" "}
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
                ¿Ha notado que su hijo se queda mirando un objeto o al vacío
                durante un tiempo prolongado, sin parecer darse cuenta de lo que
                ocurre a su alrededor?{" "}
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
                ¿Tu hijo ha presentado alguna vez ictericia, es decir, un tono
                amarillento en la piel o en los ojos, especialmente poco después
                de nacer?{" "}
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
                ¿Hay algún familiar en tu familia que haya sido diagnosticado
                con Trastorno del Espectro Autista (TEA)?{" "}
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
        <div className="mt-8 flex">
          {!view ? (
            <>
              <Button
                className="w-[150px] font-montserrat font-medium"
                color="primary"
                onClick={registerEvaluation}
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
      <ToastContainer />
    </section>
  );
}
