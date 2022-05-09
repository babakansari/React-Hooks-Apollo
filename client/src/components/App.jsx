import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Container } from "@mui/material";
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import Login from './auth/Login';
import menuRouteMap, {getKeyByLabel} from './common/MenuMap';
import { AppContextProvider } from './context/AppContext';

function App() {
  
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
}

export default App;
