import useCookies from "./CookieManager";
import { getAppContext } from "../context/AppContext";

export const useBasicAuth = () => {
    const appContext = getAppContext(); 
    const cookies = useCookies('basic-auth-object');
    return {

        get authState() {
            const userSessionCookie = cookies.get();
            return {
                ...userSessionCookie,
                get isAuthenticated () {
                    const isAuthenticated = (appContext && appContext.State.authenticated) || (cookies && userSessionCookie);
                    return isAuthenticated ? true : false;
                }
            };
        },

        get basicAuth () {
            return {
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
            };
        }

    };
  }