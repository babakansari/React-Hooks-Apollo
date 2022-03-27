function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
function createFakeRow(index) {
  return {
    id: index,
    avartar: makeid(50),
    county: index,
    email: makeid(50),
    title: makeid(50),
    firstName: makeid(50),
    lastName: makeid(50),
    street: index,
    zipCode: makeid(50),
    date: makeid(50),
    bs: index,
    catchPhrase: index,
    companyName: makeid(50),
    words: index,
    sentence: index
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}
