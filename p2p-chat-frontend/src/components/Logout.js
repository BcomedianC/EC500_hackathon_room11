import React from "react";
import GoogleLogout from 'react-google-login';
import { AuthContext } from "../pages/App";
import Button from '@material-ui/core/Button';
const axios = require('axios').default;

export default function Logout(){
  const { state, dispatch } = React.useContext(AuthContext);

  const handleLogout = (res) => {
    axios.post('http://127.0.0.1:5000/logout', {email: state.user.email})
    .then((resp) => {
      dispatch({ type: "logout"});
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
    console.log('Logout success: ', res);
  }

  return(
    <Button variant="contained" onClick={handleLogout}>Logout</Button>
  )
}
