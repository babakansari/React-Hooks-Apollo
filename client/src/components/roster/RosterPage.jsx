import React from "react";
import {
  DataEditor,
  GridCellKind
} from "@glideapps/glide-data-grid";
import { Typography, Grid, TextField } from "@mui/material";
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';
import useSession from "../auth/SessionManager";
import { useOktaAuth } from '@okta/okta-react';

function RostersPage () {
  const session = useSession();
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const gridRef = React.useRef(null);
  const { authState } = useOktaAuth();

  const isBasicAuthenticated = session.isAuthenticated()
  const isOktaAuthenticated = authState && authState.isAuthenticated;

  if(!isBasicAuthenticated && !isOktaAuthenticated) {
    return (<div>
      <Typography variant="h2">Requires Authentication...</Typography>
    </div>);
  }

  const {loading, error, data} = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache' 
  });

  const getContent = React.useCallback((cell) => {
    return getData(cell);
  }, [data, foundRows]);

  const getRowThemeOverride = React.useCallback((row) => {
    if( foundRows.indexOf(row.toString())>=0 ) {
      return {
                bgCell: blue[50]
            }
    }
    return undefined;
  }, [foundRows]);

  function onSearch(e){
    const value = e.target.value.toUpperCase();

    if(value.length<1){
      setFoundRows([]);
      setTotalFound();
      return;
    }
  
    const found = Lodash.pickBy(data.rostering, 
      function(v, k){
        //if( v.name && v.name.startsWith(value) ) {
        if( v.name && v.name.toUpperCase().indexOf(value)>=0 ) {
          return true;
        }
      }
    );
    
    const indexes = Lodash.keys(found);

    setFoundRows(indexes);
    const matches = indexes.length;
    if(matches>0){
      gridRef.current.scrollTo(0, indexes[0]);
      setTotalFound((matches===1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound();
    }

  }

  if(error){
    return (<div>
      <Typography variant="h2">Rostering (Error loading page...)</Typography>
      {error.message}
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
    if(!data.rostering){
      return null;
    }
    const rostering = data.rostering;
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
        <TextField id="search" label="Search name" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
      </Grid>
      <Grid item>

          {<DataEditor 
              width={1000} 
              ref={gridRef} 
              getCellContent={getContent} 
              columns={columns} 
              rows={data && data.rostering && data.rostering.length}
              getRowThemeOverride={getRowThemeOverride}
          />}

      </Grid>
    </Grid>
  );
}

export default RostersPage;
