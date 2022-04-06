import { apolloClient } from './ApolloClient';

export async function executeQuery(query) {
    
    const {data} = await apolloClient.query({ 
        query, 
        fetchPolicy: 'no-cache' 
    });
    return data.rostering;
}

