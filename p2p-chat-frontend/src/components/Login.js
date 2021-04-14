import React from "react";
import GoogleLogin from 'react-google-login';
import { AuthContext } from "../pages/App";

const clientId = '184252370004-1ue8k5g34tf7t55q85vq66rkdj8369uj.apps.googleusercontent.com'

export default function Login(){
  const { dispatch } = React.useContext(AuthContext);

  const onLoginSuccess = (res) => {
    dispatch({ type: "login", payload: res.profileObj});
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
