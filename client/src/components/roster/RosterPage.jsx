import React from "react";
import ReactDataGrid from "react-data-grid";
import createRowData, { columns } from "./createRowData";

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
