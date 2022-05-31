import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Container } from "@mui/material";
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import BasicLogin from './auth/BasicLogin';
import OktaLogin from './auth/OktaLogin';
import { getPathByLabel } from './common/MenuMap';
import { CustomRoute } from './CustomRoute';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const redirectPath = process.env.REACT_APP_OKTA_CALLBACK_PATH;
  const onAuthRequired = () => {
    history.push('/OktaLogin');
  };

  const oktaAuth = new OktaAuth({
    issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/${process.env.REACT_APP_OKTA_AUTH_SERVER_ID}`,
    clientId: process.env.REACT_APP_OKTA_CLIENTID,
    redirectUri: window.location.origin + redirectPath,
    onAuthRequired: onAuthRequired,
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Container>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Header/>
          <Route path={getPathByLabel('Home')} component={HomePage} exact={true} />
          <CustomRoute label={'Roster'} component={RostersPage} />
          <Route path={getPathByLabel('Crew')} component={CrewPage} />
          <Route path={getPathByLabel('BasicLogin')} component={BasicLogin} />
          <Route path={getPathByLabel('OktaLogin')} component={OktaLogin} />
          <Route path={redirectPath} component={LoginCallback} />
        </Security>
    </Container>
  );
};
export default AppWithRouterAccess;