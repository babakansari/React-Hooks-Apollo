import React from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { loginReducer, initialLoginState } from "./LoginReducer";
import useBasicAuth from "./BasicAuth";

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

function BasicLogin () {
  const classes = useStyles();
  const [formState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const basicAuth = useBasicAuth();
  const isAuthenticated = basicAuth.isAuthenticated();

  function onLogin(){

    const authenticate = async () => {
      try {
        let response = await axios.post( process.env.REACT_APP_SERVER_URL+'/login', formState );
        if (response.status === 200) {
          basicAuth.signIn({
            token: response.data.token,
            username: formState.username
          });
          
          return;
        }
      } catch(err) {
        basicAuth.signOut();
      }
    };

    authenticate();
  }

  function onInputFormData(e){
    dispatch({
      type: "INPUT_FORM_DATA",
      name: e.target.name,
      value: e.target.value
    });
  }

  function onLogout(){
    basicAuth.signOut();
  }

  if(isAuthenticated){
    return (
      <Grid item className={classes.root}>
        <Button variant="contained" onClick={onLogout}>Logout</Button>
      </Grid>
    );
  }

  return  (
    <Grid>
      <Grid item >
        <Grid item className={classes.root}>
          <Typography variant="h2">Basic Authentication</Typography>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="User name" name="username" value={formState.username} onChange={ onInputFormData }/>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="Password" name="password" type="password" value={formState.password} onChange={ onInputFormData } placeholder="bob"/>
        </Grid>
        <Grid item className={classes.root}>
          <Button variant="contained" onClick={onLogin}>Login</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasicLogin;
