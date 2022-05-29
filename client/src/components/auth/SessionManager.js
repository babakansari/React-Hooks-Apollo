import useCookies from "./CookieManager";
import { getAppContext } from "../context/AppContext";

const useSession = () => {
    const cookies = useCookies('user-session-object');
    const userSessionCookie = cookies.get();
    const appContext = getAppContext(); 
    
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