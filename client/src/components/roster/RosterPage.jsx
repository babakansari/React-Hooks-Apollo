import React from "react";
import ReactDataGrid from "react-data-grid";

import createRowData from "./createRowData";


const COLUMN_WIDTH = 140;

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

const ROW_COUNT = 5000;
const rows = createRowData(ROW_COUNT);

function RostersPage() {
  
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rows={rows}
      minHeight={600}
    />
  );
}

export default RostersPage;
