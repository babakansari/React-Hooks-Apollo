import React, { useReducer } from 'react';
import AppContextReducer from './AppContextReducer';
import AppState from './AppState';

const initialState = new AppState(null, 0);

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppContextReducer, initialState);

    return (
        <AppContext.Provider value={{ State: state, Dispatch: dispatch }}>
            { children }
        </AppContext.Provider>
    );
  }
