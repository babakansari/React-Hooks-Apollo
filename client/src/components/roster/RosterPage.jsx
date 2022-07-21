import React from 'react';
import {
  GridCellKind,
} from '@glideapps/glide-data-grid';
import { Typography, Grid, TextField } from '@mui/material';
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';
import { useSession } from '../auth/SessionManager';
import { ScrollableGrid } from './ScrollableGrid';
import { useScrollableGrids } from './useScrollableGrids';

function RostersPage () {
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const [position, setPosition] = React.useState(0);
  const session = useSession();

  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null); 
  const gridRef3 = React.useRef(null);
  const gridRef4 = React.useRef(null);
  const gridRefs = React.useRef([gridRef1, gridRef2, gridRef3, gridRef4]);

  if(!session.isAuthenticated) {
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

  const { ScrollTo, OnScroll } = useScrollableGrids(gridRefs, [data, foundRows]);
  OnScroll((e) => {
    setPosition(e);
  });

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
      ScrollTo(indexes[0], 0);
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

    const cellTheme = (cell && cell.indexOf && cell.toLowerCase().indexOf("m", )>=0) ? 
                      {
                          textDark: "#225588",
                          baseFontStyle: "bold 13px",
                          bgCell: "#F2F9FF",
                      } : null;

    return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: JSON.stringify(cell),
        data: cell,
        themeOverride: cellTheme,
    };
  }

  let scrollableGrids=[];
  for(let i=0; i<gridRefs.current.length; i++) {
    scrollableGrids.push(
      <Grid item key={i}>
        <ScrollableGrid
          ref={gridRefs.current[i]}
          rowHeight={26}
          name={`Grid_${i}`}
          columns={columns} 
          getCellContent={getContent} 
          rows={data && data.rostering && data.rostering.length}
          visibleRows={3}
          getRowThemeOverride={getRowThemeOverride}
        />
      </Grid>
    );
  }

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search name" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
      </Grid>
      <Grid container>
        <Typography id="Scroll"  variant="standard" >Scroll position: {JSON.stringify(position)} </Typography>
      </Grid>
        <div>
          {scrollableGrids}
        </div>
    </Grid>
  );
}

export default RostersPage;
