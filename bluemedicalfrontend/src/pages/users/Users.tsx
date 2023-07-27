import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
// import Add from "../../components/add/Add";
import { userRows } from "../../data";
import { Modal, Typography, Box, FormControl, FormLabel, InputLabel, Input, Button } from "@mui/material";
import {addUser} from "./helpers/addUser"
import { useFetchUsers } from "./hooks/useFetchUsers";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "id",
    type: "string",
    headerName: "Id",
    width: 150,
  },
  {
    field: "name",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
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

const Users = () => {
  const [open, setOpen] = useState(false);
  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');
  const {users, getUs} = useFetchUsers();

  const onSubmit = async () =>{
    const user = {name: nameForm, email: emailForm, password: passwordForm}
    const sendUser = await addUser(user);
    if(sendUser.code == 200) {
      setOpen(false);
      setNameForm('');
      setEmailForm('');
      setPasswordForm('');
      getUs();
    }
  }

  

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <div> */}
              <FormControl >
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input id="name" name="name" value={ nameForm } onChange={ ev => setNameForm(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" name="email" value={ emailForm } onChange={ ev => setEmailForm(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" value={passwordForm} onChange={ ev => setPasswordForm(ev.target.value) }/>
              </FormControl>
              <FormControl>
                <Button onClick={ onSubmit } variant="contained">Enviar</Button>
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
      <DataTable slug="users" columns={columns} rows={users} />
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

export default Users;
