
import {
  GridCellKind
} from "@glideapps/glide-data-grid";

export const ROW_COUNT = 230;
const COL_COUNT = 22;
const COLUMN_WIDTH = 100;

const columns = [
  { title: "id",          id: "id",          width: 50 },
  { title: "avartar",     id: "avartar",     width: 200 },
  { title: "county",      id: "county",      width: 250 },
  { title: "email",       id: "email",       width: COLUMN_WIDTH },
  { title: "title",       id: "title",       width: COLUMN_WIDTH },
  { title: "firstName",   id: "firstName",   width: COLUMN_WIDTH },
  { title: "lastName",    id: "lastName",    width: COLUMN_WIDTH },
  { title: "street",      id: "street",      width: COLUMN_WIDTH },
  { title: "zipCode",     id: "zipCode",     width: COLUMN_WIDTH },
  { title: "date",        id: "date",        width: COLUMN_WIDTH },
  { title: "bs",          id: "bs",          width: COLUMN_WIDTH },
  { title: "catchPhrase", id: "catchPhrase", width: COLUMN_WIDTH },
  { title: "companyName", id: "companyName", width: COLUMN_WIDTH },
  { title: "sentence",    id: "sentence",    width: COLUMN_WIDTH },
  { title: "words",       id: "words",       width: COLUMN_WIDTH }
];

export function getColumn(){
  
  for(let i=0; i<COL_COUNT; i++){
    columns.push({
      title: `col${i}`,
      id: `col${i}`,
      width: COLUMN_WIDTH
    });
  }
  return columns;
}

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
  for(let i=0; i<COL_COUNT; i++){
    rows[`col${i}`] = i*index;
  }
  return rows;
}

export function getData(data, [col, row]) {
  
  const dataRow = data[row];
  // dumb but simple way to do this
  const indexes = [
    "id",
    "avartar",
    "county",
    "email",
    "title",
    "firstName",
    "lastName",
    "street",
    "zipCode",
    "date",
    "bs",
    "catchPhrase",
    "companyName",
    "sentence",
    "words",
  ];
  for(let i=0; i<COL_COUNT; i++){
    const colName = `col${i}`;
    if(!indexes.includes(colName)){
      indexes.push(colName);
    } else {
      console.log(`colName = ${colName}`);
    }
  }
  const d = dataRow[indexes[col]]
  
  return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: d.toString(),
      data: d,
  };
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

export const getSearchData = (data, selection) => {
  const result = [];
  for (let y = selection.y; y < selection.y + selection.height; y++) {
      const row = data[y];
      result.push(  [
        {},
        {},
        {
          kind: GridCellKind.Text,
          allowOverlay: false,
          displayData: row['county'],
          data: row['county'],
        }
      ]);

  }
  return result;
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