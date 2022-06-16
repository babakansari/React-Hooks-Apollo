import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, getColumn, getSearchData, ROW_COUNT} from "./createRowData";
import {Grid, TextField, Button , Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';
import { RosteringGrid } from './RosteringGrid';

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols, setCols] = React.useState(columns);
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();
  const [position, setPosition] = React.useState(0);

  const getContent1 = React.useCallback((cell) => {
    return getData(data, cell);
  }, [data, foundRows]);

  const getContent2 = React.useCallback((cell) => {
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
      // gridRef1.current.scrollTo(0, indexes[0].toString());
      gridRef2.current.scrollTo(0, indexes[0].toString());
      setTotalFound((matches==1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound();
    }

  }

  const onScrollTo = (e) => {
    let y = parseInt(e.target.value.toUpperCase());
    if(isNaN(y)){
      y = 0;
    }
    gridRef1.current.ScrollTo(y);
  };
  
  const onScroll = (position) =>{
    //console.log(`position = ${JSON.stringify(position)}`);
    setPosition(position);
  };

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search county" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
      </Grid>
      <Grid container>
        {/* <Typography id="Scroll"  variant="standard" >Scroll position: {JSON.stringify(position)} </Typography> */}
        <Typography id="Scroll"  variant="standard" >Scroll position: ??? </Typography>
      </Grid>
      <Grid container>
        <TextField id="scrollTo" label="Scroll To" variant="standard" value={position ? position.top : 0} onChange={ onScrollTo }/>
        {/* <TextField id="scrollTo" label="Scroll To" variant="standard" onChange={ onScrollTo }/> */}
      </Grid>
        <div>
          <Grid item>
              <RosteringGrid
                ref={gridRef1}
                columns={cols} 
                getCellContent={getContent1} 
                rows={data.length} 
                visibleRows={6}
                onScroll={onScroll}
                freezeColumns={4} 
                getRowThemeOverride={getRowThemeOverride}
                getCellsForSelection={ cellsForSelection } 
              />
          </Grid>
          <br/>
          <Grid item>
            
              <DataEditorContainer width={1000} height={280} >
                  <DataEditor 
                      ref={gridRef2} 
                      getCellContent={getContent2} 
                      
                      rows={data.length} 
                      columns={cols} 
                      freezeColumns={4} 
                      getRowThemeOverride={getRowThemeOverride}

                      onHeaderClicked={(colIndex, event) =>{
                          const newColumns = [...columns];
                          newColumns[0].icon = newColumns[0].icon ? undefined : "headerMarkdown";
                          setCols(newColumns);
                        }
                      }

                      showSearch={true} 
                      getCellsForSelection={ cellsForSelection } 
                  />
              </DataEditorContainer>
          </Grid>
        </div>
    </Grid>
  );
}


export default RostersPage;
