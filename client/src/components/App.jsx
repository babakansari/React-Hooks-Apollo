import {  BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import React  from 'react';
import { Container } from "@mui/material";
import Header from "./common/Header";
import HomePage from './common/HomePage';
import RostersPage from './roster/RosterPage';
import CrewPage from './roster/CrewPage';
import Login from './auth/Login';
import menuRouteMap, {getKeyByLabel} from './common/MenuMap';

function App() {
  return (
    // <Router ref={(router) => this.router = router}>
    //   <div>
    //     <NavBar />
    //     <section className="section">
    //       <div className="container">
    //         <Switch>
    //           <Route exact path="/"  />
    //           <Route path="/companies/:companyId"  />
    //           <Route exact path="/jobs/new" />
    //           <Route path="/jobs/:jobId" />
    //           <Route exact path="/login" />
    //         </Switch>
    //       </div>
    //     </section>
    //   </div>
    // </Router>
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
  );
}

export default App;
