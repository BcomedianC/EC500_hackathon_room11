import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button';

const clientId = '184252370004-1ue8k5g34tf7t55q85vq66rkdj8369uj.apps.googleusercontent.com'
export default function Login(){
  const responseGoogle = (response) => {
    console.log(response);
  }

  return(
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
