import { DataStore } from 'notarealdb'

const store = new DataStore('./data');

export default {
  rostering: store.collection('rostering'),
  //: store.collection('users')
};