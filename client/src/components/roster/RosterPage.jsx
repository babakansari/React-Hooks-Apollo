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

const columns = [
  // { title: "id", width: 85 },
  { title: "name", width: 85 },
  { title: "lastname", width: 85 },
  { title: "country", width: 85 },
  // { title: "city", width: 110 },
  { title: "rank", width: 250 },
];

function RostersPage () {
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const [position, setPosition] = React.useState(0);
  const session = useSession();

  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null); 
  const gridRef3 = React.useRef(null);
  const gridRefs = [gridRef1, gridRef2, gridRef3];

  if(!session.isAuthenticated) {
    return (<div>
      <Typography variant="h2">Requires Authentication...</Typography>
    </div>);
  }

  const result = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache',
  });

  const result2 = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache',
      variables: {
        filter: "record.rankId.indexOf('1')>=0"
      },
  });

  React.useEffect(() => {
    for(let i=0; i<=100; i++){
      columns.push({
        title: `col_${i}`,
        width : 100,
        type: "ext"
      });
    }
  }, []);

  const getContent = React.useCallback((cell) => {
    if(!result || !result.data || !result.data.rostering)
      return null;
    return getData(result.data.rostering, cell);
  }, [result, foundRows]);

  const getContent2 = React.useCallback((cell) => {
    if(!result2 || !result2.data || !result2.data.rostering)
      return null;
    return getData(result2.data.rostering, cell);
  }, [result2]);

  const { ScrollTo, OnScroll } = useScrollableGrids(
    () => { return gridRefs },
    true,
    true,
    []
  );

  OnScroll((e) => {
    setPosition(e);
  });

  const onDecorateCell = (cell) => {
    return (cell.displayData && cell.displayData.indexOf("an")>=0 && cell.displayData.indexOf("Rank")<0) ? "underline" : null;
  };

  const getRowThemeOverride = React.useCallback((gridId, row) => {
    if( gridId === 0 && foundRows.indexOf(row.toString())>=0 ) {
      return {
                bgCell: blue[50]
            }
    }
    return undefined;
  }, [foundRows]);

  function onSearch(e){
    const value = e.target.value.toUpperCase();
    // gridRef1.current.ScrollTo(0, parseFloat(value | 0));
    if(value.length<1){
      setFoundRows([]);
      setTotalFound();
      return;
    }
  
    const found = Lodash.pickBy(result.data.rostering, 
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

  if(result.error || result2.error){
    return (<div>
      <Typography variant="h2">Rostering (Error loading page...)</Typography>
      {result.error.message}
    </div>);
  }

  if(result.loading || result2.loading){
    return (<div>
      <Typography variant="h2">Rostering (Loading...)</Typography>
    </div>);
  }

  function getData(rostering, [col, row]) {
    const dataRow = rostering[row];
    if(columns[col].type === "ext"){
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: (col+1|1*row+col|2).toString(),
        data: (col+1|1*row+col|2).toString(),
      }
    }

    const cellData = dataRow[columns[col].title];

    return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: JSON.stringify(cellData),
        data: cellData,
    };
  }

  let scrollableGrids=[];
  for(let i=0; i<gridRefs.length; i++) {
    const rows = (i===1) ? 
                    result2.data && result2.data.rostering && result2.data.rostering.length : 
                    result.data && result.data.rostering && result.data.rostering.length;
    const getCellContent = (i===1) ? 
                              getContent2 :
                              getContent ;

    scrollableGrids.push(
      <Grid item key={i}>
        <ScrollableGrid
          ref={gridRefs[i]}
          rowHeight={26}
          width={1000}
          name={`Grid_${i}`}
          columns={columns} 
          getCellContent={getCellContent} 
          rows={rows}
          height={250}
          freezeColumns={4}
          getRowThemeOverride={ (row) => getRowThemeOverride(parseInt(i), row) }
          OnDecorateCell={onDecorateCell}
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
