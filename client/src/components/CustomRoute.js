import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import { getPathByLabel } from './common/MenuMap';
import { useOktaAuth } from '@okta/okta-react';
import useBasicAuth from "./auth/BasicAuth";

export const CustomRoute = ({ label, component }) => {
  const { authState } = useOktaAuth();
  const basicAuth = useBasicAuth();
  const isBasicAuthenticated = basicAuth.isAuthenticated();
  const isOktaAuthenticated = authState && authState.isAuthenticated;

  return isBasicAuthenticated || isOktaAuthenticated
    ? <Route path={getPathByLabel(label)} component={component} />
    : <SecureRoute path={getPathByLabel(label)} component={component} />;
};