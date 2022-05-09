import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useReducer } from 'react';
import { Container } from "@mui/material";
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import Login from './auth/Login';
import menuRouteMap, {getKeyByLabel} from './common/MenuMap';

export const ApplicationContext = React.createContext();

const initialState = { 
  claims: { 
    username: null
  } 
};

const ApplicationReducer = (state, action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      return { 
        claims: { 
          username: action.payload 
        } 
      };
    case 'LOGGED_OUT':
      return { 
        claims: { 
          username: null
        } 
      };
    default:
      return state;

  }
}

function App() {
  const [ state, dispatch ] = useReducer(ApplicationReducer, initialState);

  return (
    <ApplicationContext.Provider value={{ State: state, Dispatch: dispatch }}>
      <Router>
        <Container>
          <Header/>
          <Routes>
            <Route path={getKeyByLabel(menuRouteMap, 'Home')} element={<HomePage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'Roster')} element={<RostersPage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'Crew')} element={<CrewPage/>} />
            <Route path={getKeyByLabel(menuRouteMap, 'Login')} element={<Login/>} />
          </Routes>
        </Container>
      </Router>
    </ApplicationContext.Provider>
  );
}

export default App;
