import React from 'react';
import { useHistory } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

const SecurityProvider = ({ children }) => {
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
    const relativeUrl = toRelativeUrl(originalUri, window.location.origin);
    history.replace(relativeUrl);
  };

  return (
    
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        { children }
      </Security>
  );
};
export default SecurityProvider;