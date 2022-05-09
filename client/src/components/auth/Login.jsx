import React, { useContext } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { loginReducer, initialLoginState } from "./LoginReducer";
import { ApplicationContext } from "../App";

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

function Login () {
  const applicationContext = useContext(ApplicationContext);
  const classes = useStyles();
  const [formState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  function onLogin(){

    const authenticate = async () => {
      try {
        let response = await axios.post( 'http://localhost:9000/login', formState );
        if (response.status === 200) {
          sessionStorage.setItem('token', response.data.token);
          // alert(`Authentication successful (token: ${JSON.stringify(response.data)})`);
          applicationContext.Dispatch({
            type: "LOGGED_IN",
            payload: formState.username
          });
          return;
        }
      } catch(err) {
        sessionStorage.setItem('token', '');
        applicationContext.Dispatch({
          type: "LOGGED_OUT"
        });
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

  return  (
    <Grid>
      <Grid item >
        <Grid item className={classes.root}>
          <Typography variant="h2">Authentication</Typography>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="User name" name="username" value={formState.username} onChange={ onInputFormData }/>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="Password" name="password" type="password" value={formState.password} onChange={ onInputFormData }/>
        </Grid>
        <Grid item className={classes.root}>
          <Button variant="contained" onClick={onLogin}>Login</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
