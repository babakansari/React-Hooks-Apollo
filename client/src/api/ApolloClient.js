import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import useSession from "../components/auth/SessionManager";

const endpointURL = process.env.REACT_APP_APOLLO_SERVER_URL;

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const session = useSession();
    const token = session.token;
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