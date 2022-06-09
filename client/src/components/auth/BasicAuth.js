import useCookies from "./CookieManager";
import { getAppContext } from "../context/AppContext";

export const useBasicAuth = () => {
    const cookies = useCookies('basic-auth-object');
    const userSessionCookie = cookies.get();
    const appContext = getAppContext(); 
    
    return {
        authState: {
            ...userSessionCookie,
            isAuthenticated: () => {
                const isAuthenticated = (appContext && appContext.State.authenticated) || (cookies && userSessionCookie);
                return isAuthenticated ? true : false;
            }
        },
        basicAuth: {
            signIn: (session) => {
                cookies.set(session, 1);
                if(appContext) {
                    appContext.Dispatch({
                        type: "LOGGED_IN"
                    });
                }
            },
    
            signOut: () => {
                cookies.remove();
                if(appContext) {
                    appContext.Dispatch({
                        type: "LOGGED_OUT"
                    });
                }
            },
        }
    };
  }