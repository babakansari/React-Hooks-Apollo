import { useOktaAuth } from '@okta/okta-react';
import { useBasicAuth } from './auth/BasicAuth';

export const useSession = () => {
    // const basicAuth = useBasicAuth();
    // const { authState } = useOktaAuth();
    
    // return {
    //     ...userSessionCookie,
    //     signIn: (session) => {
    //         cookies.set(session, 1);
    //         if(appContext) {
    //             appContext.Dispatch({
    //                 type: "LOGGED_IN"
    //             });
    //         }
    //     },

    //     signOut: () => {
    //         cookies.remove();
    //         if(appContext) {
    //             appContext.Dispatch({
    //                 type: "LOGGED_OUT"
    //             });
    //         }
    //     },

    //     isAuthenticated: () => {
    //         const isAuthenticated = (appContext && appContext.State.authenticated) || (cookies && userSessionCookie);
    //         return isAuthenticated ? true : false;
    //     },
    // };
  }