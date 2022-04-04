import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const endpointURL = "http://localhost:9000/graphql";

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

    const {data} = await apolloClient.query({ 
        query, 
        fetchPolicy: 'no-cache' 
    });
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
        cache: new InMemoryCache()
    });
    return apolloClient;
}
