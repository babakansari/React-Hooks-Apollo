import AppState from './AppState';

const AppContextReducer = (state, action) => {
    const newState = new AppState(state.username, state.menuIndex);

    switch(action.type) {
        case 'LOGGED_IN':
            newState.username = action.payload;
            break;
        case 'LOGGED_OUT':
            newState.username = null;
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