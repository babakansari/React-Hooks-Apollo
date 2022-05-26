import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import AppWithRouterAccess from './AppWithRouterAccess';

function App() {

  return (
    <AppContextProvider>
      <Router>
        <AppWithRouterAccess/>
      </Router>
    </AppContextProvider>
  );
}

export default App;
