import AppState from './AppState';

const AppContextReducer = (state, action) => {
    const newState = new AppState(state.username, state.menuIndex);

    switch(action.type) {
        case 'LOGGED_IN':
            newState.authenticated = true;
            break;
        case 'LOGGED_OUT':
            newState.authenticated = false;
            break;
        case 'NAVIGATE':
            newState.menuIndex = action.payload;
            break;
        default:
            break;
    }
    return newState;
}

export default AppContextReducer;