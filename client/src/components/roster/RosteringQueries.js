import gql from 'graphql-tag';

export const rosteringQuery = gql`
query {
    rostering {
        id
        name
        rank {
            id
            title
        }
    }
}`;