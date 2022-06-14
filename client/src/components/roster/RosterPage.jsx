import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, getColumn, getSearchData, ROW_COUNT} from "./createRowData";
//import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
//import { ScrollSync, ScrollSyncNode } from "scroll-sync-react";
//import { useScrollSync } from "react-use-scroll-sync"
//import useSyncScroll from 'react-use-sync-scroll';
import {Slider, Grid, TextField, Button , Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as Lodash from 'lodash';

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols, setCols] = React.useState(columns);
  const [foundRows, setFoundRows] = React.useState([]);
  const [totalFound, setTotalFound] = React.useState();

  //const [y, setY] = React.useState(0);
  const [position, setPosition] = React.useState();
  const [scrollTo, SetScrollTo] = React.useState(0);

  const [firstRow, setFirstRow] = React.useState(-1);

  const getContent1 = React.useCallback((cell) => {
    //console.log(`row: ${JSON.stringify(cell[1])}`);
    if(firstRow==-1){
      setFirstRow(cell[1]);
    }
    return getData(data, cell);
  }, [data, foundRows]);

  const getContent2 = React.useCallback((cell) => {
    //console.log(`row: ${JSON.stringify(cell[1])}`);
    return getData(data, cell);
  }, [data, foundRows]);

  const gridRef1 = React.useRef(null);
  const gridRef2 = React.useRef(null);
  const sliderRef = React.useRef(null);
  const gridRefs = React.useRef([gridRef1, gridRef2]);
  const scrollRef = React.useRef(null);
  
  // Use the hook
  // useSyncScroll(gridRefs, { vertical: true, horizontal: false });


  // useScrollSync([gridRef1, gridRef2], {
  //   horizontal: true,
  //   vertical: true,
  //   proportional: true
  // })

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
      gridRef1.current.scrollTo(0, indexes[0].toString());
      gridRef2.current.scrollTo(0, indexes[0].toString());
      setTotalFound((matches==1) ? `${matches} match` : `${matches} matches`);
    } else {
      setTotalFound();
    }

  }

  const onVisibleRegionChanged = React.useCallback(( range, tx, ty ) => {
    //console.log(`range: ${JSON.stringyfy(range)}, tx: ${JSON.stringyfy(tx)}, ty: ${JSON.stringyfy(ty)}` );
    setPosition(({
            top: range.y,
            height: range.height
          }));
          //setY(range.y);
  }, [data]);

  const onScrollClicked = () => {
    let y = scrollTo;
    // console.log(`top = ${position.top}, height = ${position.height}`);
    const top = position.top;
    const bottom = position.top + position.height-2;

    console.log(`y = ${y}, top = ${top}, bottom = ${bottom}`);

    if(y>top){
      // y = bottom+y-top-1;
      y = position.height+y-3;
    }

    // if(y>top && y<bottom){
    //   y = bottom+y-top-1;
    // } else if(y>bottom) {
    //   y = bottom+y-top-1;
    // }
    console.log(`y' = ${y}`);
 
    //console.log(`Bounds = ${JSON.stringify(gridRef1.current.getBounds(1,2))}`);
    gridRef1.current.scrollTo(0,y);
  
  }

  const onScrollTo = React.useCallback((e) => {
    
    let y = parseInt(e.target.value.toUpperCase());
    if(isNaN(y)){
      y = 0;
    }
    SetScrollTo(y);
    // var node = document.getElementsByClassName("dvn-scroller ");
    // //var a = ReactDOM.findDOMNode(node);
  
    // console.log(`ref = ${JSON.stringify(node)}`);

  }, [position]);


  return (
    <Grid container spacing={5} >
      <Grid container>
        <TextField id="search" label="Search county" variant="standard" helperText={ totalFound } onChange={ onSearch }/>
      </Grid>
      <Grid container>
        <Typography id="Scroll"  variant="standard" >Scroll position: {JSON.stringify(position)} --- Redndered Row: {firstRow}</Typography>
      </Grid>
      <Grid container>
        <TextField id="scrollTo" label="Scroll To" variant="standard" onChange={ onScrollTo }/>
        <Button onClick={onScrollClicked}>Scroll</Button>
      </Grid>
      {/* <ScrollSync> */}
        <div>
          <Grid item>
            {/* <Slider
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
            /> */}
            
              <DataEditorContainer width={1000} height={292}>
               {/* <ScrollSyncPane group="a" > */}
                  <DataEditor 
                      ref={gridRef1} 
                      scrollRef={scrollRef}
                      getCellContent={getContent1} 
                      onVisibleRegionChanged={ onVisibleRegionChanged }
                      columns={cols} 
                      rows={data.length} 
                      freezeColumns={4} 
                      getRowThemeOverride={getRowThemeOverride}

                      // onVisibleRegionChanged={
                      //   (range) =>{
                      //     setPosition(({
                      //       top: range.y,
                      //       height: range.height
                      //     }));
                      //     setY(range.y);
                      //   }
                      // }

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
                {/* </ScrollSyncPane> */}
              </DataEditorContainer>
            
          </Grid>
          <Grid item>
            
              <DataEditorContainer width={1000} height={280} >
                {/* <ScrollSyncPane group="a"> */}
                  <DataEditor 
                      ref={gridRef2} 
                      getCellContent={getContent2} 
                      columns={cols} 
                      rows={data.length} 
                      freezeColumns={4} 
                      getRowThemeOverride={getRowThemeOverride}
                      
                      // onVisibleRegionChanged={
                      //   (range) =>{
                      //     //gridRef1.current.scrollTo(0, range.y);
                      //     //gridRef1.current.setAttribute("BABAK", "helloButton");
                      //     //console.log(`gridRef1=${JSON.stringify(gridRef2.current)}`);
                      //     //setY(range.y);
                      //   }
                      // }

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
                {/* </ScrollSyncPane> */}
              </DataEditorContainer>
            
          </Grid>
        </div>
      {/* </ScrollSync> */}
    </Grid>
  );
}


export default RostersPage;
