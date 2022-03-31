import React from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

function Login () {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return  (
    <Grid Container direction="row">
      <Grid item Container direction="column">
        <Grid item className={classes.root}>
          <Typography variant="h2">Authentication</Typography>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="User name" id="username" value={username} onChange={ (event) => setUsername(event.target.value) }/>
        </Grid>
        <Grid item className={classes.root}>
          <TextField label="Password" id="password" type="password" value={password} onChange={ (event) => setPassword(event.target.value) }/>
        </Grid>
        <Grid item className={classes.root}>
          <Button variant="contained">Login</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
