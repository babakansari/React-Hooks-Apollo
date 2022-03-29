import db from './db.js';

const Query = {
    crew: (root, {id}) => db.rostering.get(id), 
    rostering: () => db.rostering.list()
};

const Crew = {
    rank: (crew) => db.ranks.get(crew.rankId)
}

export default { Query, Crew };