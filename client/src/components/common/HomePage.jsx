import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button } from "@mui/material";
import { AppContext } from "../context/AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

const HomePage = () => {
  const appContext = useContext(AppContext);
  const classes = useStyles();
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  function navigateToMenu(menuIndex){
    navigate('/auth/OktaLogin');
    appContext.Dispatch({
      type: 'NAVIGATE',
      payload: menuIndex
    });
  }

  if (!authState) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ?
    <Button onClick={() => {oktaAuth.signOut()}} variant="contained">Logout</Button> :
    <Button onClick={() => {navigateToMenu(4)}} variant="contained">Login</Button>;

  return (
    <Grid>
      <Grid item >
        <Grid item className={classes.root}>
          <Typography variant="h2">Project Home Page</Typography>
        </Grid>
        <Grid item className={classes.root}>
          <Typography variant="caption">Sample SPA Web application using React, Material UI and Apollo</Typography>
        </Grid>
        <Grid item className={classes.root}>
          {button}
        </Grid>
      </Grid>
    </Grid>
)};

export default HomePage;
