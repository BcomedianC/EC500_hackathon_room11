import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../pages/App";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSnackbar } from 'notistack';
const axios = require('axios').default;

const useStyles = makeStyles({
  chatPaper: {
    background: '',
    border: 1,
    borderRadius: 4,
    boxShadow: '0 3px 5px 2px #e1e5ee',
    color: '#2A324B',
    height: 600,
    width: 800,
    padding: '25px',
    marginTop: '20px',
  },
  searchBox: {
    width: 400,
  },
  messageBox: {
    width: '100%',
    marginTop: '20px',
  },
  chatBox: {
    width: '100%',
    height: 400,
    border: "1px solid #e1e5ee",
    flex: 30,
  },
  divider: {
    width: "100%",
    height: 0,
    borderTop: "1px solid #e1e5ee",
    borderColor: "#e1e5ee",
    marginTop: 15,
    marginBottom: 15
  },
});

export default function Chat(){
  const { state, dispatch } = React.useContext(AuthContext);
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [contact, setContact] = useState('');
  const [msg, setMsg] = useState('');
  const [isConnected, setConnected] = useState(false);

  const handleSearchChange = (event) => {
    setContact(event.target.value);
  }
  const handleMessageChange = (event) => {
    setMsg(event.target.value);
  }

  const handleSearchSubmit = () => {
    if (contact === '') {
      enqueueSnackbar('Please enter a contact to message', {variant: 'error'});
      return;
    }
    if (contact === state.user.email){
      enqueueSnackbar('You can\'t message yourself :)', {variant: 'error'});
      return;
    }

    const req_url = 'http://127.0.0.1:'+ state.port.toString() +'/connect';
    axios.post(req_url, {email: contact})
    .then((resp) => {
      enqueueSnackbar(resp.data, {variant: 'info'});
      if (resp.data === 'Successfully connected to contact.'){
        setConnected(true);
      }
      console.log(resp);
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data, {variant: 'error'});
      console.log(err);
    });
  };

  const handleMessageSubmit = () => {
    if (contact === '') {
      enqueueSnackbar('Please enter a contact to message', {variant: 'error'});
      return;
    }
    if (contact === state.user.email){
      enqueueSnackbar('You can\'t message yourself :)', {variant: 'error'});
      return;
    }

    const req_url = 'http://127.0.0.1:'+ state.port.toString() +'/send';
    axios.post(req_url, {from: state.user.email, to: contact, message: msg})
    .then((resp) => {
      enqueueSnackbar(resp.data, {variant: 'info'});
      console.log(resp);
    })
    .catch((err) => {
      enqueueSnackbar(err.response.data, {variant: 'error'});
      console.log(err);
    });
  }

  return(
    <Paper className={classes.chatPaper}>
      <TextField
        className={classes.searchBox}
        label="Search for a contact"
        variant="outlined"
        onChange={(event) => handleSearchChange(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => handleSearchSubmit()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Grid className={classes.divider}></Grid>
      <Grid className={classes.chatBox}>

      </Grid>
      <TextField
        className={classes.messageBox}
        label="Send a message"
        variant="outlined"
        onChange={(event) => handleMessageChange(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => handleMessageSubmit()}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Paper>
  )
}
