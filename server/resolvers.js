import { AuthenticationError } from 'apollo-server-express';
import db from './db.js';

const Query = {
    rank: (root, {id}) => db.ranks.get(id),
    crew: (root, {id}) => db.rostering.get(id), 
    rostering: (root, {filter}, context) => {
        if(!context.user){
            throw new AuthenticationError("Authentication error");
        }
        if(!filter){
            return db.rostering.list();
        } else {
            // Sample filter would be like:
            // {
            //     "filter": "record.name.indexOf('an')>=0"
            // }
            const filterFunc = (new Function("record", `return (${filter})`));
            return db.rostering.list().filter( filterFunc );
        }
    },
};

const Mutation = {
    createCrew: (root, {input}, context) => {
        // Check user is authenticated
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