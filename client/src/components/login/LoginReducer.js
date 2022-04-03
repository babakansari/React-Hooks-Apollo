export const initialLoginState = {
    username: "",
    password: "",
    token: null,
    };

export function loginReducer( state, action ){
    switch (action.type){
        case "INPUT_FORM_DATA": {
            return {
                ...state,
                [action.name]: action.value
            };
        }
        case "AUTHENTICATE": {
            console.log(`Authenticate: ${action.data.username}, ${action.data.password}`);
            return action.data;
        }
        default:
            return state;
    }
}


