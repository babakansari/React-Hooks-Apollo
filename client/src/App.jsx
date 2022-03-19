// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavBar from './components/NavBar'
import Header from "./components/Header";

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
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
