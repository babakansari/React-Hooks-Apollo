import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { loginReducer, initialLoginState } from "./LoginReducer";

const useStyles = makeStyles(theme => ({
    root: {
      height: 80
    }
  }));
  
const Oktalogin = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const classes = useStyles();
  const [formState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  function onLogin(){
    oktaAuth.signInWithCredentials({ username: formState.username, password: formState.password })
    .then(res => {
      const sessionToken = res.sessionToken;
      setSessionToken(sessionToken);
      // sessionToken is a one-use token, so make sure this is only called once
      oktaAuth.signInWithRedirect({ sessionToken });
    })
    .catch(err => console.log('Found an error', err));
  }

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  function onInputFormData(e){
    dispatch({
      type: "INPUT_FORM_DATA",
      name: e.target.name,
      value: e.target.value
    });
  }

  return (
    <Grid>
    <Grid item >
        <Grid item className={classes.root}>
            <Typography variant="h2">Okta Authentication</Typography>
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
};
export default Oktalogin;