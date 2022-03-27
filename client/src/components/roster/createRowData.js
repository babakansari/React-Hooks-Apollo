
import {
  GridCellKind
} from "@glideapps/glide-data-grid";

export const columns = [
  { title: "id",          id: "id",          width: 50 },
  { title: "avartar",     id: "avartar",     width: 100 },
  { title: "county",      id: "county",      width: 100 },
  { title: "email",       id: "email",       width: 200 },
  { title: "title",       id: "title",       width: 200 },
  { title: "firstName",   id: "firstName",   width: 100 },
  { title: "lastName",    id: "lastName",    width: 100 },
  { title: "street",      id: "street",      width: 100 },
  { title: "zipCode",     id: "zipCode",     width: 100 },
  { title: "date",        id: "date",        width: 100 },
  { title: "bs",          id: "bs",          width: 100 },
  { title: "catchPhrase", id: "catchPhrase", width: 100 },
  { title: "companyName", id: "companyName", width: 100 },
  { title: "sentence",    id: "sentence",    width: 100 },
  { title: "words",       id: "words",       width: 100 }
];

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
    county: makeid(50),
    email: makeid(50),
    title: makeid(50),
    firstName: makeid(50),
    lastName: makeid(50),
    street: index,
    zipCode: index,
    date:  Date.now(),
    bs: index,
    catchPhrase: index,
    companyName: index,
    sentence: index,
    words: index
  };
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
  const d = dataRow[indexes[col]]
  return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: d.toString(),
      data: d,
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}