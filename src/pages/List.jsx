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
import {Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link} from "@nextui-org/react";


export default function List() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
    },{
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
  
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const rowsPerPage = 7;

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
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
          <Button onPress={onOpen} className="mr-4 h-[40px] w-[150px] font-montserrat font-medium" color="primary" variant="solid">
        Agregar Paciente
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className="font-montserrat w-[400px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registro de paciente</ModalHeader>
              <ModalBody>
                <Input
                  
                  
                  label="Nombre"
                  placeholder="Ingrese el nombre completo del paciente"
                  variant="bordered"
                />
                <Input
                  
                  label="Edad"
                  placeholder="Ingrese la edad del paciente"
                 
                  variant="bordered"
                />
                
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
