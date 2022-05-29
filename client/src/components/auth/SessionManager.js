import useCookies from "./CookieManager";
import { getAppContext } from "../context/AppContext";

const useSession = () => {
    const cookies = useCookies('user-session-object');
    const userSessionCookie = cookies.get();
    const appContext = getAppContext(); 
    
    return {
        ...userSessionCookie,
        create: (session) => {
            cookies.set(session, 1);
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
            return (appContext && appContext.State.authenticated) || (cookies && userSessionCookie);
        },
    };
  }

export default useSession;