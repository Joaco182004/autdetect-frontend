import React, { useState, useMemo } from "react";
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
import { DateInput } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";

import { Button } from "@nextui-org/react";
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
import { es } from "date-fns/locale";

export default function List() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const users = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "CTO",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Jane Doe",
      role: "CMO",
      status: "Active",
    },
    {
      key: "4",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    {
      key: "5",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    {
      key: "6",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    {
      key: "7",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    {
      key: "8",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    {
      key: "9",
      name: "John Smith",
      role: "CFO",
      status: "Inactive",
    },
    // Add more users if needed
  ];
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
    { key: "Villa María del Triunfo", label: "Villa María del Triunfo" }
  ];
  
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const rowsPerPage = 7;

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.role.toLowerCase().includes(filter.toLowerCase()) ||
        user.status.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, users]);

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);

  return (
    <section className="w-full h-full overflow-auto outline-none select-none">
      <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Lista de pacientes
      </h1>
      <div className="h-[auto] flex flex-col items-center bg-white mx-8 content-list rounded-md pb-4">
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
                    <Input
                      label="Nombre del tutor"
                      placeholder="Ingrese el nombre completo del tutor"
                      variant="bordered"
                    />
                    <Input
                      label="DNI del tutor"
                      placeholder="Ingrese el nombre completo del tutor"
                      variant="bordered"
                    />
                    <Input
                      label="Número de contacto"
                      placeholder="Ingrese el número de contacto"
                      variant="bordered"
                    />
                    <Input
                      label="Correo de contacto"
                      placeholder="Ingrese el correo de contacto"
                      variant="bordered"
                    />
                    <DateInput
                      variant="bordered"
                      label="Fecha de nacimiento del paciente"
                    
                    />
                    <Input
                      label="Nombre del paciente"
                      placeholder="Ingrese el nombre del paciente"
                      visibleMonths
                      variant="bordered"
                    />
                    <Select
            variant="bordered"
            label="Género del paciente"
            placeholder="Seleccione el género del paciente"
      
          >
            {[{key: "Masculino", label: "Masculino"},{key: "Femenino", label: "Femenino"}].map((gender) => (
              <SelectItem className="font-montserrat" key={gender.key}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            label="Género del paciente"
            placeholder="Seleccione el género del paciente"
      
          >
            {distritosLimaMetropolitana.map((country) => (
              <SelectItem className="font-montserrat" key={country.key}>
                {country.label}
              </SelectItem>
            ))}
          </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Registrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
