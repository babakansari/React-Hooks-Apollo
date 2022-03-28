import React from "react";
import ReactDataGrid from "react-data-grid";
import createRowData, { getCols } from "./createRowData";


const rows = createRowData();

function RostersPage() {
  
  return (
    <div style = {{height:"100vh"}}>
      <ReactDataGrid
        columns={getCols()}
        rowGetter={i => rows[i]}
        rows={rows}
        minHeight={600}
      />
    </div>
  );
}

export default RostersPage;
