import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Container } from "@mui/material";
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import BasicLogin from './auth/BasicLogin';
import OktaLogin from './auth/OktaLogin';
import { getPathByLabel } from './common/MenuMap';

const AppWithRouterAccess = () => {
  const history = useNavigate();
  const onAuthRequired = () => {
    history.push('/OktaLogin');
  };

  const oktaAuth = new OktaAuth({
    issuer: process.env.REACT_APP_OKTA_DOMAIN+'/oauth2/default',
    clientId: process.env.REACT_APP_OKTA_CLIENTID,
    redirectUri: window.location.origin + '/auth/OktaLogin',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Container>
        <Header/>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
            <Route path={getPathByLabel('Home')} element={<HomePage/>} />
            <Route path={getPathByLabel('Roster')} element={<RostersPage/>} />
            <Route path={getPathByLabel('Crew')} element={<CrewPage/>} />
            <Route path={getPathByLabel('BasicLogin')} element={<BasicLogin/>} />
            <Route path={getPathByLabel('OktaLogin')} element={<OktaLogin/>} />
            <Route path='/auth/callback' component={LoginCallback} />
        </Routes>
        </Security>
    </Container>
  );
};
export default AppWithRouterAccess;