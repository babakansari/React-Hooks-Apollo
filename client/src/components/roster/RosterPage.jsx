import React from "react";
import ReactDataGrid from "react-data-grid";
import createRowData, { getCols } from "./createRowData";
import { makeStyles } from "@material-ui/styles"

const rows = createRowData();

const useStyles = makeStyles(theme => ({
  root: {
    height: 600
  }
}));

function RostersPage() {
  const classes = useStyles();
  return (
    <div>
      <ReactDataGrid
        className={classes.root}
        columns={getCols()}
        rowGetter={i => rows[i]}
        rows={rows}
        minHeight={600}
        enableCellSelect={true}
      />
    </div>
  );
}

export default RostersPage;
