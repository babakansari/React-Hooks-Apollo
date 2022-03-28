const ROW_COUNT = 10001;
const COL_COUNT = 366;
const COLUMN_WIDTH = 100;

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
  const rows = {
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
  for(let i=1; i<=COL_COUNT; i++){
    rows[`col${i}`] = i*(index+1);
  }
  return rows;
}

const columns = [
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

export function getCols(){

  for(let i=0; i<COL_COUNT; i++){
    columns.push({
      key: `col${i}`,
      name: `col${i}`,
      width: COLUMN_WIDTH
    });
  }
  return columns;
}

function timeElapse(startTime) {
  const endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  return seconds;
}

export default function createRowData() {
  const startTime = new Date();
  try{
    console.log(`Generating data`);
    return [...Array(ROW_COUNT).keys()].map(i => createFakeRow(i));
  } finally {
    console.log(`Data generation done (${timeElapse(startTime)} seconds)`);
  }
}
