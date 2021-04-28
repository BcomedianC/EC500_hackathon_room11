import React from 'react';
import { AuthContext } from "../pages/App";
import Chat from '../components/Chat';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function HomePage(){
  const { state, dispatch } = React.useContext(AuthContext);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {state.isAuthenticated ? <Chat /> : <Typography variant="h6">Please login to access the chat page.</Typography>}
    </Grid>
  )
}
