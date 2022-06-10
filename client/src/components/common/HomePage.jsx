import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@mui/material';
import useMenu from './MenuManager';
import { useSession } from '../auth/SessionManager';

const useStyles = makeStyles(theme => ({
  root: {
    height: 80
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const { navigateToLabel } = useMenu(); 
  const session = useSession();

  if (!session.initialized) {
    return <div>Loading...</div>;
  }

  const oktaButton = session.isOktaAuthenticated ?
                      <Button onClick={() => {session.oktaSignOut()}} variant="contained">Okta Logout</Button> :
                      <Button onClick={() => {navigateToLabel('OktaLogin')}} variant="contained">Okta Login</Button>;

  const basicButton = session.isBasicAuthenticated ?
                      <Button onClick={() => {session.basicSignOut()}} variant="contained">Basic Logout</Button> :
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
