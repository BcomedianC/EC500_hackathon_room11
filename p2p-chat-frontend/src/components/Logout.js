import React from "react";
import GoogleLogout from 'react-google-login';
import { AuthContext } from "../pages/App";
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
const axios = require('axios').default;

export default function Logout(){
  const { state, dispatch } = React.useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleLogout = (res) => {
    const req_url = 'http://127.0.0.1:'+ state.port.toString() +'/logout'
    axios.post(req_url, {email: state.user.email})
    .then((resp) => {
      dispatch({ type: "logout"});
      enqueueSnackbar(resp.data, {variant: 'success'});
      console.log(resp);
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data, {variant: 'error'});
      console.log(err);
    });
  }

  return(
    <Button variant="contained" onClick={() => handleLogout()}>Logout</Button>
  )
}
