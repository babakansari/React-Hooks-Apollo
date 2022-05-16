import React from "react";
import {
  DataEditor,
  GridCellKind
} from "@glideapps/glide-data-grid";
import { Typography, Grid, TextField } from "@mui/material";
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';
import { AppContext } from "../context/AppContext";

function RostersPage () {
  const appContext = React.useContext(AppContext);

  if(!appContext.State.claims.username){
    return (<div>
      <Typography variant="h2">Requires Authentication...</Typography>
    </div>);
  }

  const {loading, error, data} = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache' 
  });
  
  const getContent = React.useCallback((cell) => {
    return getData(cell);
  }, [data]);

  if(error){
    return (<div>
      <Typography variant="h2">Rostering (Error loading page...)</Typography>
    </div>);
  }

  if(loading){
    return (<div>
      <Typography variant="h2">Rostering (Loading...)</Typography>
    </div>);
  }

  const columns = [
    { title: "id", width: 100 },
    { title: "name", width: 100 },
    { title: "rank", width: 500 },
  ];

  function getData([col, row]) {
    const rostering = data.rostering;
    console.dir(rostering);
    const dataRow = rostering[row];
    const cell = dataRow[columns[col].title];

    return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: JSON.stringify(cell),
        data: cell,
    };
  }

  return (
    <Grid container spacing={5} >
      <Grid item >
        <TextField id="search" label="Search county" variant="standard" />
      </Grid>
      <Grid item>

          {<DataEditor 
              width={1000} 
              
              getCellContent={getContent} 
              columns={columns} 
              rows={data.rostering.length}
          />}

      </Grid>
    </Grid>
  );
}

export default RostersPage;
