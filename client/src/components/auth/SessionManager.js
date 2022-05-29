import React from "react";
import useCookies from "./CookieManager";
import { AppContext } from "../context/AppContext";

const useSession = () => {
    const cookies = useCookies('user-session-object');
    const appContext = React.useContext(AppContext);
    const userSessionCookie = cookies.get();
    return {
        ...userSessionCookie,
        create: (session) => {
            cookies.set(session);
            appContext.Dispatch({
                type: "LOGGED_IN"
            });
        },

        clear: () => {
            cookies.remove();
            appContext.Dispatch({
                type: "LOGGED_OUT"
            });
        },

        isAuthenticated: () => {
            const isAuthenticated = appContext.State.authenticated || (cookies && userSessionCookie);
            return isAuthenticated;
        },
    };
  }

export default useSession;