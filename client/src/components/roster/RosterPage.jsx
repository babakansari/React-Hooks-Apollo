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
  const [totalFound, setTotalFound] = React.useState(`Search result ...`);
  const [position, setPosition] = React.useState(0);
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, []); 
  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null); 
  const gridRef3 = React.useRef(null);
  const gridRef4 = React.useRef(null);
  const gridRefs = React.useRef([gridRef1, gridRef2, gridRef3, gridRef4]);
  
  const { ScrollTo } = useScrollableGrids(gridRefs, (e) => {
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

  const cellsForSelection = React.useCallback((selection) => 
  {
    return getSearchData(data, selection);
  }, []);


  function onSearch(e){
    const value = e.target.value.toUpperCase();

    if(value.length<1){
      setFoundRows([]);
      setTotalFound(0);
      return;
    }
  
    const indexes = Lodash.keys(Lodash.pickBy(data, 
      function(v, k){
        if( v.county.toUpperCase().startsWith(value) ) {
        //if( v.county.toUpperCase().indexOf(value)>=0 ) {
          return true;
        }
      }
    ));

    setFoundRows(indexes);
    const matches = indexes.length;
    if(matches>0){
      ScrollTo(parseInt(indexes[0]), 0);
      setTotalFound((matches===1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound(`Search result ...`);
    }

  }

  let scrollableGrids=[];
  for(let i=0; i<gridRefs.current.length; i++) {
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
