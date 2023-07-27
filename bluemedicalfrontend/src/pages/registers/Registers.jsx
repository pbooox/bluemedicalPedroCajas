// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Registers.scss";
import { useState } from "react";
// import Add from "../../components/add/Add";
import { Modal, Box, FormControl, InputLabel, Input, Button, Typography } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
import { addRegister } from "./helpers/addRegister";
import { exitRegister } from "./helpers/exitRegister";
import { comienzaRegister } from "./helpers/comienzaRegister";
import { getPayment } from "./helpers/getPayment";
import { useFetchRegisters } from "./hooks/useFetchRegisters";
import JsPDF from 'jspdf'
const columns = [
  // { field: "id", headerName: "ID", width: 90 },
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "id",
    type: "string",
    headerName: "ID",
    width: 150,
  },
  {
    field: "plate",
    type: "string",
    headerName: "Placa",
    width: 150,
  },
  {
    field: "entry_time",
    type: "string",
    headerName: "Hora de entrada",
    width: 150,
  },
  {
    field: "exit_time",
    type: "string",
    headerName: "Hora de salida",
    width: 150,
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Registers = () => {
  const { registers, getReg } = useFetchRegisters();
  
  const [modale, setModale] = useState(false);
  const [modals, setModals] = useState(false);
  const [comienza, setComienza] = useState(false);
  const [pago, setPago] = useState(false);

  const [plate, setPlate] = useState('');
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');
  const [paymentM, setPaymentM] = useState(false);

  const [payments, setPayments] =useState([]);


  const onSubmitE = async () =>{
    const sendRegister = await addRegister(plate);
    if(sendRegister.code == 200) {
      setModale(false);
      setPlate('')
      getReg();
    }
  }
  const onSubmitS = async () =>{
    const sendExit = await exitRegister(plate);
    if(sendExit.code == 200) {
      setModals(false);
      setPlate('')
      getReg();
      if(sendExit.payment) {
        setPaymentM(true);
        setPayment(sendExit.payment);
      }
    }
  }

  const onSubmitComienza = async () => {
    const sendComienza = await comienzaRegister();
    if(sendComienza.code == 200) {
      setComienza(false);
      getReg();
    }
  }
  const onSubmitPayment = async () => {
    const getPay = await getPayment();
    setPayments(getPay)
    console.log(payments[0])
    // if(g.code == 200) {
    //   setComienza(false);
    //   getReg();
    // }
    const doc = new JsPDF({
      unit: 'cm',
      format: [33, 21.5],
    })
    var altura = 2
    doc.text('Placa', 2, 1)
    doc.text('Minutos', 10, 1)
    doc.text('Total', 20, 1)


    // doc.text('This is a sample content for the PDF.', 10, 20);
    for (let i = 0; i < payments.length; i++) {
      if(payments[i].plate != null) {
        doc.text(payments[i].plate, 2, altura)
      }
      if(payments[i].minutes != null) {
        doc.text(payments[i].minutes.toString(), 10, altura)
      }
      if(payments[i].total != null) {
        doc.text(payments[i].total.toString(), 20, altura)
      }
      altura = altura + 2;
    }
    doc.save(`${name}.pdf`)

  }


  return (
    <div className="registers">
      <div className="info">
        <h1>Registros</h1>
        <button onClick={() => setModale(true)}>Registrar entrada</button>
        <button onClick={() => setModals(true)}>Registrar salida</button>
        <button onClick={() => setComienza(true)}>Comienza mes</button>
        <button onClick={() => setPago(true)}>Pagos de residentes</button>

        <Modal
          open={modale}
          onClose={() => setModale(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Registrar entrada
              </Typography>
              <FormControl >
                <InputLabel htmlFor="plate">Placa</InputLabel>
                <Input id="plate" name="plate" value={ plate } onChange={ ev => setPlate(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitE } sx={{ ml:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
        <Modal
          open={modals}
          onClose={() => setModals(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                Registrar salida
              </Typography>
              <FormControl >
                <InputLabel htmlFor="plate">Placa</InputLabel>
                <Input id="plate" name="plate" value={ plate } onChange={ ev => setPlate(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitS } sx={{ ml:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
        <Modal
          open={comienza}
          onClose={() => setComienza(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Esta seguro de comenzar mes?
              </Typography>
              <FormControl>
                <Button  fullWidth onClick={ ()=>setComienza(false) } variant="contained">Cancelar</Button>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitComienza } sx={{ ml:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
        <Modal
          open={pago}
          onClose={() => setPago(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ingrese el nombre del documento
              </Typography>
              <FormControl >
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input id="name" name="namee" value={ name } onChange={ ev => setName(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitPayment } sx={{ ml:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
        <Modal
          open={paymentM}
          onClose={() => setPaymentM(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Cobre {payment} porfavor
              </Typography>
          </Box>
        </Modal>
      </div>
      <DataTable slug="users" columns={columns} rows={registers} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {/* {open && <Add slug="user" columns={columns} setOpen={setOpen} />} */}


    </div>
  );
};

export default Registers;
