import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button } from "@mui/material";
import useMenu from './MenuManager';
import useBasicAuth from "../auth/BasicAuth";

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const { authState, oktaAuth } = useOktaAuth();
  const { navigateToLabel } = useMenu();
  const basicAuth = useBasicAuth(); 

  if (!authState) {
    return <div>Loading...</div>;
  }

  const oktaButton = authState.isAuthenticated ?
                      <Button onClick={() => {oktaAuth.signOut()}} variant="contained">Okta Logout</Button> :
                      <Button onClick={() => {navigateToLabel('OktaLogin')}} variant="contained">Okta Login</Button>;

  const basicButton = basicAuth.isAuthenticated() ?
                      <Button onClick={() => {basicAuth.signOut()}} variant="contained">Basic Logout</Button> :
                      <Button onClick={() => {navigateToLabel('BasicLogin')}} variant="contained">Basic Login</Button>;
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
          {oktaButton}-{basicButton}
        </Grid>
      </Grid>
    </Grid>
)};

export default HomePage;
