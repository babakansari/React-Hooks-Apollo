import React from 'react';
import { AppContextProvider } from './context/AppContext';
import Routes from './Routes';
import { Container } from "@mui/material";
import theme from "./common/Theme";
import { ThemeProvider } from "@material-ui/styles"

function App() {

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <Routes/>
        </Container>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
