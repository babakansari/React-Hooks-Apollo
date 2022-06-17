import * as React from 'react';
import createRowData, {getData, getColumn, getSearchData} from "./createRowData";
import {Grid, TextField , Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';
import { ScrollableGrid } from './ScrollableGrid';

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols] = React.useState(columns);
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const [position, setPosition] = React.useState(0);

  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, [data, foundRows]);

  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null);
  

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
  }, [data]);

  
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
      setTotalFound((matches==1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound();
    }

  }
  
  const onScroll1 =(e) =>{
    gridRef2.current.ScrollTo(e.position.top);
    setPosition(e.position);
  };

  const onScroll2 = (e) =>{
    gridRef1.current.ScrollTo(e.position.top);
  };

  const onScroll = React.useCallback((e) =>{
  
    //if(e.target && e.target.current &&  e.target.current.ScrollTo){
      e.target.current.ScrollTo(e.position.top);
    //}
    

  }, []);

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search county" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
      </Grid>
      <Grid container>
        <Typography id="Scroll"  variant="standard" >Scroll position: {JSON.stringify(position)} </Typography>
      </Grid>
        <div>
          <Grid item>
              <ScrollableGrid
                ref={gridRef1}
                columns={cols} 
                getCellContent={getContent} 
                rows={data.length} 
                visibleRows={6}
                onScroll={onScroll1}
                freezeColumns={4} 
                getRowThemeOverride={getRowThemeOverride}
                getCellsForSelection={ cellsForSelection } 
              />
          </Grid>
          <br/>
          <Grid item>
              <ScrollableGrid
                ref={gridRef2}
                columns={cols} 
                getCellContent={getContent} 
                rows={data.length} 
                visibleRows={6}
                onScroll={onScroll2}
                freezeColumns={4} 
                getRowThemeOverride={getRowThemeOverride}
                getCellsForSelection={ cellsForSelection } 
              />
          </Grid>
        </div>
    </Grid>
  );
}


export default RostersPage;
