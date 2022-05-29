import React, { useReducer } from 'react';
import AppContextReducer from './AppContextReducer';
import AppState from './AppState';

const initialState = new AppState(false, 0);
const AppContext = React.createContext();

export const getAppContext = () => {
    try {
        return React.useContext(AppContext);
    } catch(err) {
        return null;
    }
};

export const AppContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppContextReducer, initialState);
    return (
        <AppContext.Provider value={{ State: state, Dispatch: dispatch }}>
            { children }
        </AppContext.Provider>
    );
  }
