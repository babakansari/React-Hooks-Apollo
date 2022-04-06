import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';

const endpointURL = "http://localhost:9000/graphql";

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: endpointURL })
    ]),
    cache: new InMemoryCache()
});