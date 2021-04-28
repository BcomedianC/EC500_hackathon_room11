import React from "react";
import GoogleLogin from 'react-google-login';
import { AuthContext } from "../pages/App";
import { useSnackbar } from 'notistack';
const axios = require('axios').default;

const clientId = '184252370004-1ue8k5g34tf7t55q85vq66rkdj8369uj.apps.googleusercontent.com'

export default function Login(){
  const { state, dispatch } = React.useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onLoginSuccess = (res) => {
    const req_url = 'http://127.0.0.1:'+ state.port.toString() +'/login'
    axios.post(req_url, {email: res.profileObj.email})
    .then((resp) => {
      dispatch({ type: "login", payload: {user: res.profileObj, port: state.port}});
      enqueueSnackbar(resp.data, {variant: 'success'});
      console.log(resp);
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data, {variant: 'error'});
      console.log(err);
    });
    console.log('Login success: ', res.profileObj);
  }
  const onLoginFailure = (res) => {
    enqueueSnackbar(res.text, {variant: 'error'});
    console.log('Login failed: ', res);
  }

  return(
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}
