import {  BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
// import NavBar from './components/NavBar'
import { Container } from "@mui/material";
import Header from "./components/common/Header";
import HomePage from './components/common/HomePage'
import RostersPage from './components/roster/RosterPage'
import CrewPage from './components/roster/CrewPage'

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
          <Route path="/" element={<HomePage/>} />
          <Route path="roster/RosterPage" element={<RostersPage/>} />
          <Route path="roster/CrewPage" element={<CrewPage/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
