// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Types.scss";
import { useState } from "react";
// import Add from "../../components/add/Add";
import { Modal, Box, FormControl, InputLabel, Input, Button } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
import { addType } from "./helpers/addType";
import { useFetchTypesSel } from "./hooks/useFetchTypesSel";

const columns = [
  {
    field: "id",
    type: "string",
    headerName: "ID",
    width: 150,
  },
  {
    field: "name",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "payment",
    type: "string",
    headerName: "Pago",
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

const Types = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    payment: ''
  });
  const {types, getTypes} = useFetchTypesSel();
  
  const handleForm = (e) => {
    const newForm= {...form};
    newForm[e.target.id] = e.target.value;
    setForm(newForm);

  }

  const onSubmit = async () =>{
    const sendType = await addType(form);
    if(sendType.code == 200) {
      setOpen(false);
      setForm({
        name: '',
        payment: ''
      });
      getTypes();
    }
  }


  return (
    <div className="types">
      <div className="info">
        <h1>Tipos de vehículo</h1>
        <button onClick={() => setOpen(true)}>Agregar tipo</button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            {/* <div> */}
              <FormControl >
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input id="name" name="name" value={ form.name } onChange={ e => handleForm(e) }/>
              </FormControl>
              <FormControl sx={{ mt:3 }}>
                <InputLabel htmlFor="payment">Precio</InputLabel>
                <Input id="payment" name="payment" type="number" value={ form.payment } onChange={ e => handleForm(e) }/>
              </FormControl>
              <FormControl>
                <Button  fullWidth onClick={ onSubmit } sx={{ ml:2 }} variant="contained">Enviar</Button>
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
      </div>
      <DataTable slug="users" columns={columns} rows={types} />
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

export default Types;
