import React, { useReducer } from 'react';
import AppContextReducer from './AppContextReducer';

const initialState = { 
    claims: { 
      username: null
    } 
}

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppContextReducer, initialState);

    return (
        <AppContext.Provider value={{ State: state, Dispatch: dispatch }}>
            { children }
        </AppContext.Provider>
    );
  }
