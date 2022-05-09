const AppContextReducer = (state, action) => {
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

export default AppContextReducer;