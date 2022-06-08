import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import { getPathByLabel } from './common/MenuMap';
import { useOktaAuth } from '@okta/okta-react';
import useSession from "./auth/SessionManager";

export const CustomRoute = ({ label, component }) => {
  const { authState } = useOktaAuth();
  const session = useSession();
  const isBasicAuthenticated = session.isAuthenticated();
  const isOktaAuthenticated = authState && authState.isAuthenticated;

  return isBasicAuthenticated || isOktaAuthenticated
    ? <Route path={getPathByLabel(label)} component={component} />
    : <SecureRoute path={getPathByLabel(label)} component={component} />;
};