import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, getColumn, ROW_COUNT} from "./createRowData";
import {Slider, Grid, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import {
  GridCellKind
} from "@glideapps/glide-data-grid";

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols, setCols] = React.useState(columns);
  const [y, setY] = React.useState(0);
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, []);

  const gridRef = React.useRef(null);
  const sliderRef = React.useRef(null);
  
  function valuetext(value) {
    return `#${value}`;
  }

  const getRowThemeOverride = React.useCallback((row) => {
      if (row % 2 === 0) {
          return {
              bgCell: blue[50]
          }
      }
      return undefined;
  }, []);

  const [showSearch, setShowSearch] = React.useState(false);
  const onSearchClose = React.useCallback(() => {
    setShowSearch(false)
  }, []);

  const cellsForSelection = (selection) => 
  {
    console.log(`selection= ${selection.x}, ${selection.y} `);
    const result = [];
    for(const row of data) {
      result.push(  [
        {},
        {},
        {
          kind: GridCellKind.Text,
          allowOverlay: false,
          displayData: row['county'],
          data: row['county'],
        }
      ]);
    }
    return result;
  }

  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="standard-basic" label="Search" variant="standard" />
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
                  // console.log(` y: ${range.y}, slider: ${sliderRef.current}`);
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
              onSearchClose={onSearchClose}
              // keybindings={{search: true}} 
          />
        </DataEditorContainer>
      </Grid>
    </Grid>
  );
}


export default RostersPage;
