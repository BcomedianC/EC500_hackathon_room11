import React from "react";
import GoogleLogin from 'react-google-login';
import { AuthContext } from "../pages/App";
const axios = require('axios').default;

const clientId = '184252370004-1ue8k5g34tf7t55q85vq66rkdj8369uj.apps.googleusercontent.com'

export default function Login(){
  const { dispatch } = React.useContext(AuthContext);

  const onLoginSuccess = (res) => {
    axios.post('http://127.0.0.1:5000/login', {email: res.profileObj.email})
    .then((resp) => {
      dispatch({ type: "login", payload: res.profileObj});
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
    console.log('Login success: ', res.profileObj);
  }
  const onLoginFailure = (res) => {
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
