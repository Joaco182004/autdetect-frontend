import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { getAllQuestionnaire } from "../api/questionnaire.api";
import { getPatientById } from "../api/infantPatient.api";
import { EyeIcon } from "@heroicons/react/24/solid";

export default function Evaluation() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const navigate = useNavigate();

  async function getPatient(id) {
    const user = await getPatientById(id);
    return user.data;
  }
  const setViewQuestionnaire = (id) => {
    localStorage.setItem("questionnaires", id);
    navigate("/app/evaluaciones/mchat");
  };

  async function getPatientId(id) {
    const res = await getPatientById(id);
    console.log(res.data.psychology);
    return res.data.psychology == localStorage.getItem("idPsychology");
  }

  async function getPatientId(id) {
    const res = await getPatientById(id);
    console.log(res.data.psychology);
    return res.data.psychology == localStorage.getItem("idPsychology");
  }
  const truncarDecimales = (num, decimales) => {
    const factor = Math.pow(10, decimales);
    return Math.floor(num * factor) / factor;
  };
  async function loadQuestionnaires() {
    const questionnaireFilter = [];
    const res = await getAllQuestionnaire();
    const data = res.data;
    for (const e of res.data) {
      const isMatching = await getPatientId(e.patient);
      if (isMatching) {
        questionnaireFilter.push(e);
      }
    }

    questionnaireFilter.map((e) => {
      e.view = (
        <div
          onClick={() => {
            setViewQuestionnaire(e.id);
          }}
          className="flex justify-center items-center cursor-pointer text-blue-600"
        >
          <EyeIcon className="w-[20px] "></EyeIcon>
        </div>
      );
    });

    const promises = questionnaireFilter.map(async (e) => {
      const patientData = await getPatient(e.patient);
      return {
        ...e,
        patient_evaluated: patientData.infant_name,
        patient_dni: patientData.infant_dni,
      };
    });

    // Wait for all promises to resolve before setting state
    const questionnairesWithPatientInfo = await Promise.all(promises);
    setQuestionnaires(questionnairesWithPatientInfo);
  }

  useEffect(() => {
    localStorage.removeItem("questionnaires");
    loadQuestionnaires();
  }, []);

  const transformValue = (value) => {
    return value === true ? "Positivo" : "Negativo";
  };
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const rowsPerPage = 7;

  const filteredQuestionnaires = useMemo(() => {
    return questionnaires.filter(
      (questionnaire) =>
        questionnaire.patient_evaluated
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        questionnaire.patient_dni
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        transformValue(questionnaire.result)
          .toLowerCase()
          .includes(filter.toLowerCase())
    );
  }, [filter, questionnaires]);

  const pages = Math.ceil(filteredQuestionnaires.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredQuestionnaires.slice(start, end);
  }, [page, filteredQuestionnaires]);

  return (
    <section className="tracking-in-expand2 w-full h-full overflow-auto outline-none select-none">
      <h1 className="tracking-in-expand font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl max-w-450:text-3xl max-w-450:ml-4">
        Lista de evaluaciones
      </h1>
      <div className="h-[auto] flex flex-col items-center bg-white mx-8 content-list rounded-md pb-4 max-w-650:mx-4 max-w-650:w-[95%] max-w-450:w-[100%] max-w-450:mx-0 max-w-450:rounded-none">
        <div className="w-[100%] flex items-center justify-between bg-red p-2 rounded-md my-4">
          <Input
            isClearable
            type="text"
            label="Filtro"
            placeholder="Ingresa lo que buscas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onClear={() => setFilter("")}
            className="w-[250px] max-w-500:w-[200px] max-w-395:text-xs outline-none ml-4 font-montserrat"
          />
          <Button
            onClick={() => {
              navigate("/app/evaluaciones/mchat");
            }}
            className="mr-4 h-[40px] w-[150px] max-w-425:w-[130px] max-w-395:w-[100px] max-w-395:h-[50px] max-w-395:text-wrap  max-w-425:text-xs  font-montserrat font-medium"
            color="primary"
            variant="solid"
          >
            Realizar Evaluación
          </Button>
        </div>
        <Table
          className="w-[95%] rounded-2xl border-1 font-montserrat"
          aria-label="Example table with client side pagination"
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
            <TableColumn key="id">Id</TableColumn>
            <TableColumn key="patient_dni">DNI del Paciente</TableColumn>
            <TableColumn key="patient_evaluated">
              Nombre del Paciente
            </TableColumn>
            <TableColumn key="date_evaluation">Fecha de Evaluación</TableColumn>
            <TableColumn key="result">Resultado</TableColumn>
            <TableColumn key="probability">Probabilidad</TableColumn>
            <TableColumn key="view">Visualizar</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey == "result"
                      ? transformValue(getKeyValue(item, columnKey))
                      : columnKey == "probability"?truncarDecimales(getKeyValue(item, columnKey), 2):getKeyValue(item, columnKey)}
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
