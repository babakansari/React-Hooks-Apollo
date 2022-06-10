import { useOktaAuth } from '@okta/okta-react';
import { useBasicAuth } from './BasicAuth';

export const useSession = () => {
    const basicAuth = useBasicAuth();
    const oktaAuth = useOktaAuth();
    
    return {
      get isBasicAuthenticated() {
        return basicAuth.authState && basicAuth.authState.isAuthenticated;
      },

      get isOktaAuthenticated() {
        return oktaAuth.authState && oktaAuth.authState.isAuthenticated;
      },

      get isAuthenticated() {
        return this.isBasicAuthenticated || this.isOktaAuthenticated;
      },

      get username() {
        return basicAuth.authState.isAuthenticated ? 
                        basicAuth.authState.username : 
                    (oktaAuth.authState && oktaAuth.authState.isAuthenticated ? 
                        oktaAuth.authState.idToken && oktaAuth.authState.idToken.claims.preferred_username : null);
      },

      get token() {
        return this.isBasicAuthenticated ? `Bearer ${basicAuth.authState.token}` : 
                this.isOktaAuthenticated ? `Bearer ${oktaAuth.authState.accessToken.accessToken}` : '';
      },

      get type() {
        return this.isBasicAuthenticated ? 'babak-basic-auth' : 
                this.isOktaAuthenticated ? 'babak-okta-auth' :
                '';
      },

      get initialized() {
        return oktaAuth.authState || basicAuth.authState;
      },

      oktaSignOut: () => {
        oktaAuth.oktaAuth.signOut();
      },

      basicSignOut: () => {
        basicAuth.basicAuth.signOut();
      }
    };
  }