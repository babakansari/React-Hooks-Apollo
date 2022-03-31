import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

const endpointURL = "http://localhost:9000/graphql";

const apolloClient = new ApolloClient({
    link: new HttpLink({uri: endpointURL}),
    cache: new InMemoryCache()
});

export async function loadRostering() {
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
    const {data} = await apolloClient.query({ query });
    return data.rostering;
}