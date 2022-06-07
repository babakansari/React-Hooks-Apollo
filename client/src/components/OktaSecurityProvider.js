import React from 'react';
import { useHistory } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Container } from "@mui/material";
import Routes from './Routes'


const OktaSecurityProvider = () => {
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
        <Routes/>
      </Security>
    </Container>
  );
};
export default OktaSecurityProvider;