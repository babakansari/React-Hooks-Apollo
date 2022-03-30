import { DataStore } from 'notarealdb'

const store = new DataStore('./data');

export default {
  rostering: store.collection('rostering'),
  ranks: store.collection('ranks'),
  users: store.collection('users'),
};
