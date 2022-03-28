import React from "react";
import ReactDataGrid from "react-data-grid";
import createRowData, { columns } from "./createRowData";

const ROW_COUNT = 100005;
const rows = createRowData(ROW_COUNT);

function RostersPage() {
  
  return (
    <div style = {{height:"100vh"}}>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rows={rows}
        minHeight={600}
      />
    </div>
  );
}

export default RostersPage;
