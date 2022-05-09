import React, { useReducer } from 'react';

const initialState = { 
    claims: { 
      username: null
    } 
}
  
const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGGED_IN':
        return { 
            claims: { 
                username: action.payload 
            } 
        };
        case 'LOGGED_OUT':
        return { 
            claims: { 
                username: null
            } 
        };
        default:
        return state;

    }
}

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ State: state, Dispatch: dispatch }}>
            { children }
        </AppContext.Provider>
    );
  }
