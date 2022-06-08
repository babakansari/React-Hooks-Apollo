import React from 'react';
import { AppContextProvider } from './context/AppContext';
import Routes from './Routes';
import { Container } from "@mui/material";

function App() {

  return (
    <AppContextProvider>
      <Container>
        <Routes/>
      </Container>
    </AppContextProvider>
  );
}

export default App;
