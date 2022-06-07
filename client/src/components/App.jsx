import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import OktaSecurityProvider from './OktaSecurityProvider';

function App() {

  return (
    <AppContextProvider>
      <Router>
        <OktaSecurityProvider/>
      </Router>
    </AppContextProvider>
  );
}

export default App;
