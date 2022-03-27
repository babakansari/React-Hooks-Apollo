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
    county: makeid(20),
    email: makeid(50),
    title: makeid(50),
    firstName: makeid(50),
    lastName: makeid(50),
    street: index,
    zipCode: index,
    date: Date.now(),
    bs: index,
    catchPhrase: index,
    companyName: index,
    words:index,
    sentence: index
  };
}

const COLUMN_WIDTH = 140;

export const columns = [
  {
    key: "id",
    name: "ID",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "title",
    name: "Title",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "firstName",
    name: "First Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "lastName",
    name: "Last Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "email",
    name: "Email",
    width: COLUMN_WIDTH
  },
  {
    key: "street",
    name: "Street",
    width: COLUMN_WIDTH
  },
  {
    key: "zipCode",
    name: "ZipCode",
    width: COLUMN_WIDTH
  },
  {
    key: "date",
    name: "Date",
    width: COLUMN_WIDTH
  },
  {
    key: "bs",
    name: "bs",
    width: COLUMN_WIDTH
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase",
    width: COLUMN_WIDTH
  },
  {
    key: "companyName",
    name: "Company Name",
    width: COLUMN_WIDTH
  },
  {
    key: "sentence",
    name: "Sentence",
    width: COLUMN_WIDTH
  }
];

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}
