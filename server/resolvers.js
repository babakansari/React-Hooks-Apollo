import { AuthenticationError } from 'apollo-server-express';
import db from './db.js';

const Query = {
    rank: (root, {id}) => db.ranks.get(id),
    crew: (root, {id}) => db.rostering.get(id), 
    rostering: () => db.rostering.list()
};

const Mutation = {
    createCrew: (root, {input}, context) => {
        // Check user is authenticated
        //  POST http://localhost:9000/login
        //  JSON Body:
        //  {
        //     "username":"bob", 
        //     "password": "bob"
        //  }
        //  Header:
        //  Authorization   bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyeTlwYndkTzIiLCJpYXQiOjE2NDg2MTExOTJ9.OqhZzSZkcbyWx9d_VGQDNV6hqz7U4iY5GEP1yfvHIVw
        if(!context.user){
            throw new AuthenticationError("Authentication error");
        }
        const id = db.rostering.create(input);
        return  db.rostering.get(id);
    }
};

// Many-to-one relation from Crew to Rank
const Crew = {
    rank: (crew) => db.ranks.get(crew.rankId)
};

// One-to-many relation from Rank to Company
const Rank = {
    Crews: (rank) => db.rostering.list()
                        .filter( (crew)=> crew.rankId === rank.id )
};

export default { Query, Mutation, Crew, Rank };