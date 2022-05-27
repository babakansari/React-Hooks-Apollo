export const initialLoginState = {
        username: "babakansari@hotmail.com",
        password: ""
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


