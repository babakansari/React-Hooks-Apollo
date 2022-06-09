import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import { useOktaAuth } from '@okta/okta-react';
import { useBasicAuth } from './auth/BasicAuth';

const AuthorizationProvider = ({ children }) => {
  const endpointURL = process.env.REACT_APP_SERVER_URL + '/graphql';
  const oktaAuth = useOktaAuth();
  const basicAuth = useBasicAuth();

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const isAuthenticated = oktaAuth.authState && oktaAuth.authState.isAuthenticated;
    const token = basicAuth.authState.token ? `Bearer ${basicAuth.authState.token}` : 
                isAuthenticated ? `Bearer ${oktaAuth.authState.accessToken.accessToken}` : '';
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token,
        authorizationType: basicAuth.authState.token ? 'babak-basic-auth' : 'babak-okta-auth',
      }
    }
  });

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: endpointURL })
    ]),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={apolloClient}>
        { children }
    </ApolloProvider>
  );
};
export default AuthorizationProvider;