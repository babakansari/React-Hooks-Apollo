export const initialLoginState = {
        username: "bob",
        password: "bob"
    };

export function loginReducer( state, action ){
    switch (action.type){
        case "INPUT_FORM_DATA": {
            return {
                ...state,
                [action.name]: action.value
            };
        }
        default:
            return state;
    }
}


