import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql(`
    type Query {
        User: String
    }
`);

const resolvers = {
    Query: {
        User: () => 'User A'
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen({port: 9000})
    .then( (serverInfo) => console.log(`Server running at ${serverInfo.url}`) );