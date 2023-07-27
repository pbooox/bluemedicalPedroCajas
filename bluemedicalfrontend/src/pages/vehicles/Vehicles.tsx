// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./vehicles.scss";
import { useState } from "react";
// import Add from "../../components/add/Add";
import { userRows } from "../../data";
import { Modal, Box, FormControl, InputLabel, Input, Button, Select, MenuItem, Typography } from "@mui/material";
import { useFetchTypesSel } from "../types/hooks/useFetchTypesSel";
import NativeSelect from '@mui/material/NativeSelect';
import { addVehicle } from "./helpers/addVehicle";
import { useFetchVehicles } from "./hooks/useFetchVehicles";

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
    field: "minutes",
    type: "string",
    headerName: "Minutos",
    width: 150,
  },
  {
    field: "type",
    type: "string",
    headerName: "Tipo",
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

const Vehicles = () => {
  const { types } = useFetchTypesSel();
  const { vehicles, getVe } = useFetchVehicles();

  // console.log(typeof types, types)
  // // console.log(types.map)
  // types.map((type) => {
  //   console.log(type)
  // })

  const [open, setOpen] = useState(false);
  const [modalOficial, setModalOficial] = useState(false);
  const [modalResidente, setModalResidente] = useState(false);

  const [form, setForm] = useState({
    plate: '',
    type: ''
  });

  const [plate, setPlate] = useState('');


  
  
  
  const handleForm = (e) => {
    const newForm= {...form};
    newForm[e.target.id] = e.target.value;
    setForm(newForm);

  }

  const onSubmit = async () =>{
    const sendVehicle = await addVehicle(form);
    if(sendVehicle.code == 200) {
      setOpen(false);
      setForm({
        plate: '',
        type: ''
      });
      getVe();
    }
  }
  const onSubmitOficial = async () =>{
    let form = {plate: plate, type: 1};
    const sendVehicle = await addVehicle(form);
    if(sendVehicle.code == 200) {
      setModalOficial(false);
      setPlate('');
      getVe();
    }
  }

  const onSubmitResidencial = async () =>{
    let form = {plate: plate, type: 2};
    const sendVehicle = await addVehicle(form);
    if(sendVehicle.code == 200) {
      setModalResidente(false);
      setPlate('');
      getVe();
    }
  }


  return (
    <div className="vehicles">
      <div className="info">
        <h1>Vehículos</h1>
        <button onClick={() => setOpen(true)}>Agregar vehículo</button>
        <button onClick={() => setModalOficial(true)}>Da de alta vehículo oficial</button>
        <button onClick={() => setModalResidente(true)}>Da de alta vehículo de residente</button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            {/* <div> */}
              <FormControl >
                <InputLabel htmlFor="plate">Placa</InputLabel>
                <Input id="plate" name="plate" value={ form.plate } onChange={ e => handleForm(e) }/>
              </FormControl>
              <FormControl fullWidth sx={{ mt:3 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">Tipo</InputLabel>
                <NativeSelect
                  value={form.type}
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}
                  onChange={handleForm}
                >
                    <option value={''}></option>

                  { 
                    types.map( (type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))
                  }
                  {/* <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option> */}
                </NativeSelect>

              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmit } sx={{ mt:2 }} variant="contained">Enviar</Button>
              </FormControl>
            {/* </div> */}
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Modal>

        <Modal
          open={modalOficial}
          onClose={() => setModalOficial(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Dar de alta a vehículo oficial
            </Typography>
              <FormControl >
                <InputLabel htmlFor="plate">Placa</InputLabel>
                <Input id="plate" name="plate" value={ plate } onChange={ e => setPlate(e.target.value) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitOficial } sx={{ mt:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
        <Modal
          open={modalResidente}
          onClose={() => setModalResidente(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Dar de alta a vehículo residencial
            </Typography>
              <FormControl >
                <InputLabel htmlFor="plate">Placa</InputLabel>
                <Input id="plate" name="plate" value={ plate } onChange={ e => setPlate(e.target.value) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmitResidencial } sx={{ mt:2 }} variant="contained">Enviar</Button>
              </FormControl>
          </Box>
        </Modal>
      </div>
      <DataTable slug="users" columns={columns} rows={vehicles} />
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

export default Vehicles;
