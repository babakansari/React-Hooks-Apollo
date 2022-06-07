import React from 'react';
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import BasicLogin from './auth/BasicLogin';
import OktaLogin from './auth/OktaLogin';
import { getPathByLabel } from './common/MenuMap';
import { CustomRoute } from './CustomRoute';
import { Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';

const Routes = () => {
    const redirectPath = process.env.REACT_APP_OKTA_CALLBACK_PATH;
    return (
        <div>
            <Header/>
            <Route path={getPathByLabel('Home')} component={HomePage} exact={true} />
            <CustomRoute label={'Roster'} component={RostersPage} />
            <Route path={getPathByLabel('Crew')} component={CrewPage} />
            <Route path={getPathByLabel('BasicLogin')} component={BasicLogin} />
            <Route path={getPathByLabel('OktaLogin')} component={OktaLogin} />
            <Route path={redirectPath} component={LoginCallback} />
        </div>
    );
  }

  export default Routes;