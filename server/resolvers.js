import db from './db.js';

const Query = {
    rostering: () => db.rostering.list()
};

export default { Query };