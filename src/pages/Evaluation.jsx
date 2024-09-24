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
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { downloadEvaluations } from "../api/custom.api";

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
  async function downloadEvaluationsReport(){
    try{
      await downloadEvaluations()
    }
    catch(e){
      console.log(e)
    }
  }
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
          <Dropdown className="font-montserrat text-xs">
      <DropdownTrigger>
        <Button 
          className="mr-4 h-[40px] w-[100px]  font-montserrat font-medium"
          color="primary"
        >
          Opciones
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => {
              navigate("/app/evaluaciones/mchat");
            }} key="new">Realizar Evaluación</DropdownItem>
        <DropdownItem onClick={downloadEvaluationsReport} key="copy">Descargar</DropdownItem>
      </DropdownMenu>
    </Dropdown> 
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
                      : columnKey == "probability"?truncarDecimales(getKeyValue(item, columnKey) *100, 2).toString() + "%":getKeyValue(item, columnKey)}
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
