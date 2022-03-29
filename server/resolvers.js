import db from './db.js';

const Query = {
    rank: (root, {id}) => db.ranks.get(id),
    crew: (root, {id}) => db.rostering.get(id), 
    rostering: () => db.rostering.list()
};

const Mutation = {
    createCrew: (root, {name, rankId}) => {
        return db.rostering.create({name, rankId})
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