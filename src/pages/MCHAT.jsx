import {React,useEffect,useState} from 'react'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {useNavigate } from 'react-router-dom';
import {getAllPatients} from "../api/infantPatient.api";
export default function MCHAT() {
  const [patients, setPatients] = useState([]);
  async function loadPatients() {
    const res = await getAllPatients();
    setPatients(res.data);
  }
  useEffect(() => {
    loadPatients();
  }, []);
  const navigate = useNavigate()
  return (
    <section className="w-full h-full overflow-auto outline-none select-none">
      <h1 className="font-montserrat font-semibold mb-[2rem] ml-[2rem] pt-[2rem] text-4xl">
        Cuesitonario de comportamiento
      </h1>
      <div className="h-[100%] flex-col ml-8 bg-white flex p-2 rounded-md my-4 mchat-content pl-4">
      <Autocomplete 
        label="Paciente"
        placeholder='Selecciona el paciente a diagnosticar'
        className="w-[405px] font-montserrat mt-2" 
      >
        {patients.map((patient) => (
          <AutocompleteItem className='font-montserrat' key={patient.id} value={patient.infant_dni}>
            {patient.infant_name + " ("+patient.infant_dni+")"}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className='flex mt-6'>
        <div className='w-6 h-6 bg-blue-500 flex justify-center items-center font-montserrat font-semibold text-white'>
            1
        </div>
      <p className='ml-2 mr-2 font-montserrat text-sm'>Si usted señala  algo al otro lado de la habitación, ¿su hijo/a lo mira? (POR EJEMPLO, Si usted
        señala a un juguete, un peluche o un animal, ¿su hijo/a lo mira?)</p>
      </div>
      <RadioGroup
      label="Seleccione la respuesta"
      orientation="horizontal"
      className='font-montserrat text-sm ml-7 mt-2'
    >
      <Radio className='text-xs' value="1">Sí</Radio>
      <Radio className='text-xs' value="0">No</Radio>
    </RadioGroup>
    <div className='flex mt-6'>
        <div className='w-6 h-6 bg-blue-500 flex justify-center items-center font-montserrat font-semibold text-white'>
            2
        </div>
      <p className='ml-2 mr-2 font-montserrat text-sm'>Si usted señala  algo al otro lado de la habitación, ¿su hijo/a lo mira? (POR EJEMPLO, Si usted
        señala a un juguete, un peluche o un animal, ¿su hijo/a lo mira?)</p>
      </div>
      <RadioGroup
      label="Seleccione la respuesta"
      orientation="horizontal"
      className='font-montserrat text-sm ml-7 mt-2'
    >
      <Radio className='text-xs' value="1">Sí</Radio>
      <Radio className='text-xs' value="0">No</Radio>
    </RadioGroup>
      <div className='mt-8 flex'>
      <Button className='w-[150px] font-montserrat font-medium' color="primary">
       Predecir
    </Button>
    <Button onClick={()=>{navigate("/app/evaluaciones")}} className='ml-2 w-[150px] font-montserrat font-medium' color="default">
       Cancelar
    </Button>
      </div>
      </div>
      
    </section>
  )
}
