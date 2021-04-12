import React from 'react';
import GoogleLogin from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage(){
  const classes = useStyles();
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          EC500 Chat
        </Typography>
        <GoogleLogin
          clientId=""
          render={renderProps => (
            <Button color="inherit">Login</Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Toolbar>
    </AppBar>


    </Grid>
  )
}
