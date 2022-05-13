import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, getColumn, getSearchData, ROW_COUNT} from "./createRowData";
import {Slider, Grid, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols, setCols] = React.useState(columns);
  const [foundRows, setFoundRows] = React.useState([]);
  const [y, setY] = React.useState(0);
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, [data, foundRows]);

  const gridRef = React.useRef(null);
  const sliderRef = React.useRef(null);
  
  function valuetext(value) {
    return `#${value}`;
  }

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
    const value = e.target.value;

    if(value.length<1){
      setFoundRows([]);
      return;
    }
  
    const indexes = Lodash.keys(Lodash.pickBy(data, 
      function(v, k){
        //if( v.county.startsWith(value) ) {
        if( v.county.indexOf(value)>=0 ) {
          return true;
        }
      }
    ));

    setFoundRows(indexes);
    if(indexes.length>0){
      gridRef.current.scrollTo(0, indexes[0].toString());
    }

  }

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search" variant="standard" onChange={ onSearch }/>
      </Grid>
      <Grid item>
        <Slider
          ref={sliderRef}
          aria-label="Row"
          defaultValue={0}
          value={y}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={ROW_COUNT}
          orientation="vertical"
          onChange={(e, val) =>{
            gridRef.current.scrollTo(0, val);
            setY(val);
          }}
        />
      </Grid>
      <Grid item>
        <DataEditorContainer width={1000} height={600}>
          <DataEditor 
              ref={gridRef} 
              getCellContent={getContent} 
              columns={cols} 
              rows={data.length} 
              freezeColumns={4} 
              getRowThemeOverride={getRowThemeOverride}
              onVisibleRegionChanged={
                (range) =>{
                  setY(range.y);
                }
              }

              onHeaderClicked={(colIndex, event) =>{
                  const newColumns = [...columns];
                  newColumns[0].icon = newColumns[0].icon ? undefined : "headerMarkdown";
                  setCols(newColumns);
                  // log(`Col: ${colIndex}, Ref: ${JSON.stringify(gridRef.current.columns)}`);
                }
              }

              showSearch={true} 
              getCellsForSelection={ cellsForSelection } 
          />
        </DataEditorContainer>
      </Grid>
    </Grid>
  );
}


export default RostersPage;
