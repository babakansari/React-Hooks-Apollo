import React from "react";
import useCookies from "./CookieManager";
import { AppContext } from "../context/AppContext";

const useSession = () => {
    const cookies = useCookies('user-session-object');
    let appContext = null;
    try {
        appContext = React.useContext(AppContext);
    } catch(err) {

    }
    
    const userSessionCookie = cookies.get();
    return {
        ...userSessionCookie,
        create: (session) => {
            cookies.set(session);
            if(appContext) {
                appContext.Dispatch({
                    type: "LOGGED_IN"
                });
            }
        },

        clear: () => {
            cookies.remove();
            if(appContext) {
                appContext.Dispatch({
                    type: "LOGGED_OUT"
                });
            }
        },

        isAuthenticated: () => {
            const isAuthenticated = (appContext && appContext.State.authenticated) || (cookies && userSessionCookie);
            return isAuthenticated;
        },
    };
  }

export default useSession;