import gql from 'graphql-tag';

export const rosteringQuery = gql`
query Query($filter: String) {
    rostering(filter: $filter){
        id
        name
        lastname
        country
        city
        rank {
            id
            title
            __typename 
        }
    __typename 
    }
}`;