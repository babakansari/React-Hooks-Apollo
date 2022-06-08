import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import useSession from "./auth/SessionManager";
import { ApolloProvider } from '@apollo/react-hooks';
import { useOktaAuth } from '@okta/okta-react';

const AuthorizationProvider = ({ children }) => {
  const endpointURL = process.env.REACT_APP_SERVER_URL + '/graphql';
  const { authState } = useOktaAuth();

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const session = useSession();
    
    const isAuthenticated = authState && authState.isAuthenticated;

    const token = session.token ? `Bearer ${session.token}` : 
                isAuthenticated ? `Bearer ${authState.accessToken.accessToken}` : '';
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token,
        authorizationType: session.token ? 'babak-basic-auth' : 'babak-okta-auth',
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