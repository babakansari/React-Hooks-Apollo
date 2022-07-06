import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSession } from './auth/SessionManager';

const AuthorizationProvider = ({ children }) => {
  const endpointURL = process.env.REACT_APP_SERVER_URL + '/graphql';
  const session = useSession();

  const authLink = setContext((_, { headers }) => {
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: session.token,
        authorizationType: session.type,
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