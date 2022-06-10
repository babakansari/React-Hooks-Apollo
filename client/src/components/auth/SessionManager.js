import { useOktaAuth } from '@okta/okta-react';
import { useBasicAuth } from './BasicAuth';

export const useSession = () => {
    const basicAuth = useBasicAuth();
    const oktaAuth = useOktaAuth();
    
    return {
      get isAuthenticated() {
        const isBasicAuthenticated = basicAuth.authState.isAuthenticated;
        const isOktaAuthenticated = oktaAuth.authState && oktaAuth.authState.isAuthenticated;

        return isBasicAuthenticated || isOktaAuthenticated;
      },

      get username() {
        return basicAuth.authState.isAuthenticated ? 
                        basicAuth.authState.username : 
                    (oktaAuth.authState && oktaAuth.authState.isAuthenticated ? 
                        oktaAuth.authState.idToken && oktaAuth.authState.idToken.claims.preferred_username : null);
      }
    };
  }