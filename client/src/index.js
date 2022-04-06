import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import theme from "./components/common/Theme";
import { ThemeProvider } from "@material-ui/styles"
import axios from "axios";
// import { ApolloProvider } from '@apollo/react-hooks';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
      {/* <ApolloProvider> */}
        <App />
      {/* </ApolloProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
