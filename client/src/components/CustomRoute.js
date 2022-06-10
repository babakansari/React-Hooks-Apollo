import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import { getPathByLabel } from './common/MenuMap';
import { useSession } from './auth/SessionManager';

export const CustomRoute = ({ label, component }) => {
  const session = useSession();

  return session.isAuthenticated
    ? <Route path={getPathByLabel(label)} component={component} />
    : <SecureRoute path={getPathByLabel(label)} component={component} />;
};