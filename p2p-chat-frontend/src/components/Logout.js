import React from "react";
import GoogleLogout from 'react-google-login';
import { AuthContext } from "../pages/App";

const clientId = '184252370004-1ue8k5g34tf7t55q85vq66rkdj8369uj.apps.googleusercontent.com'

export default function Logout(){
  const { dispatch } = React.useContext(AuthContext);

  const onLogoutSuccess = (res) => {
    dispatch({ type: "logout"});
    console.log('Logout success: ', res);
  }
  const onLogoutFailure = (res) => {
    console.log('Logout failed: ', res);
  }

  return(
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
      onFailure={onLogoutFailure}
    ></GoogleLogout>
  )
}
