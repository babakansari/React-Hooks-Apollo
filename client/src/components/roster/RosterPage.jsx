import * as React from 'react';
import createRowData, {getData, getColumn, getSearchData} from "./createRowData";
import {Grid, TextField , Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';
import { ScrollableGrid } from './ScrollableGrid';
import { useScrollableGrids } from './useScrollableGrids';

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols] = React.useState(columns);
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const [position, setPosition] = React.useState(0);
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, []); 
  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null); 
  const gridRef3 = React.useRef(null);
  const gridRef4 = React.useRef(null);
  const locksRef = React.useRef(0);
  const gridRefs = React.useRef([gridRef1, gridRef2, gridRef3, gridRef4]);
  
  React.useEffect(() => {

    const onScroll = (e) => {
      if (!e.target || !e.target.current) {
        return;
      }
     
      if (locksRef.current > 0) {
        locksRef.current -= 1; // Release a lock
        return;
      }
      locksRef.current = gridRefs.current.length - 1; // Acquire locks

      for (const gridRef of gridRefs.current) {
        if (gridRef === e.target) {
          // if (onScrolling) {
          //   onScrolling(e);
          // }
          setPosition(e);
          continue;
        }
        gridRef.current.ScrollTo(e.position.top);
      }
    };
   
    for (const gridRef of gridRefs.current) {
      gridRef.current.OnScroll = onScroll;
    }

  }, []);

  

  const getRowThemeOverride = React.useCallback((row) => {
      if( foundRows.indexOf(row.toString())>=0 ) {
        return {
                  bgCell: blue[50]
              }
      }
      return undefined;
  }, [foundRows]);

  const cellsForSelection = React.useCallback((selection) => 
  {
    return getSearchData(data, selection);
  }, []);


  function onSearch(e){
    const value = e.target.value.toUpperCase();

    if(value.length<1){
      setFoundRows([]);
      setTotalFound();
      return;
    }
  
    const indexes = Lodash.keys(Lodash.pickBy(data, 
      function(v, k){
        //if( v.county.startsWith(value) ) {
        if( v.county.toUpperCase().indexOf(value)>=0 ) {
          return true;
        }
      }
    ));

    setFoundRows(indexes);
    const matches = indexes.length;
    if(matches>0){
      gridRef2.current.scrollTo(0, indexes[0].toString());
      setTotalFound((matches===1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound();
    }

  }

  let scrollableGrids=[];
  for(let i=0; i<4; i++) {
    scrollableGrids.push(
      <Grid item key={i}>
        <ScrollableGrid
          ref={gridRefs.current[i]}
          name={`Grid_${i}`}
          columns={cols} 
          getCellContent={getContent} 
          rows={data.length} 
          visibleRows={3}
          freezeColumns={4} 
          getRowThemeOverride={getRowThemeOverride}
          getCellsForSelection={ cellsForSelection } 
        />
      </Grid>
    );
  }

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search county" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
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
