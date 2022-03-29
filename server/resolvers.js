import db from './db.js';

const Query = {
    crew: (root, args) => db.rostering.get(args.id), 
    rostering: () => db.rostering.list()
};

const Crew = {
    rank: (crew) => db.ranks.get(crew.rankId)
}

export default { Query, Crew };