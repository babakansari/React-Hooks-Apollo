import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const endpointURL = "http://localhost:9000/graphql";

// Disable caching
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

export async function loadRostering(token) {
    
    const query = gql`{
        rostering {
            id
            name
            rank {
                id
                title
            }
        }
    }`;
    const apolloClient = createApolloClient(token);

    const {data} = await apolloClient.query({ query });
    return data.rostering;
}

function createApolloClient(token) {
    const authLink = new ApolloLink((operation, forward) => {

        operation.setContext(({ headers }) => ({
            headers: {
                authorization: `bearer ${token}`,
                ...headers
            }
        }));
        return forward(operation);
    });

    const apolloClient = new ApolloClient({
        link: ApolloLink.from([
            authLink,
            new HttpLink({ uri: endpointURL })
        ]),
        cache: new InMemoryCache(),
        defaultOptions
    });
    return apolloClient;
}
