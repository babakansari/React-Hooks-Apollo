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
import menuRouteMap, {getKeyByLabel} from './common/MenuMap';

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
            <Route path={getKeyByLabel(menuRouteMap, 'Home')} element={<HomePage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'Roster')} element={<RostersPage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'Crew')} element={<CrewPage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'BasicLogin')} element={<BasicLogin/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'OktaLogin')} element={<OktaLogin/>} />
            <Route path='/auth/callback' component={LoginCallback} />
        </Routes>
        </Security>
    </Container>
  );
};
export default AppWithRouterAccess;