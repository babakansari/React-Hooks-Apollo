import * as React from 'react';
import {
    DataEditorContainer,
    DataEditor
  } from "@glideapps/glide-data-grid";
import { GridEvent, GridPosition } from './ScrollableGridTypes';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ScrollableGridImpl = (props, forwardedRef) => {
    const gridRef = React.useRef(null);
    const gridName = React.useRef(props.name);
    const [position, setPosition] = React.useState(0);
    const epsilon = 20;
    const rowHeight = props.rowHeight ? props.rowHeight : 34;
    const headerHeight = props.headerHeight ? props.headerHeight : 36;
    const height = props.height;
    const rowsTotalHeight = height - headerHeight - epsilon - 1;
    const visibleRows =
      props.visibleRows || Math.floor(rowsTotalHeight / (rowHeight + 1)) - 1;
    const gridHeight = visibleRows * (rowHeight + 1) + headerHeight + 1 + epsilon;
    const onScrollEventRef = React.useRef(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPos, setAnchorPos] = React.useState({x:0,y:0});
    const open = Boolean(anchorEl);

    const onVisibleRegionChanged = React.useCallback( ( range, tx, ty ) => {
        if(!onScrollEventRef){
            return;
        }
        const currentPosition = GridPosition(range.y, range.x,  range.height, range.width);
        const event = GridEvent(forwardedRef, currentPosition); 

        if(onScrollEventRef.current){
            onScrollEventRef.current(event);
        }
        
        setPosition(currentPosition);

    }, [onScrollEventRef, forwardedRef]);

    const onCellContextMenu = (cell, event) => {
        console.log(`cell=${JSON.stringify(cell)}, \r\n event = ${JSON.stringify(event)}`);
        setAnchorPos({ x: event.bounds.x, y: event.bounds.y});

        const bounds = gridRef.current.getBounds(cell[0], cell[1]);
        console.log(`bound = ${JSON.stringify(bounds)}`);
        
        setAnchorEl(event);
        event.preventDefault();
    };
    
    const onCellClicked = (cell) => {
        //alert(`cell=${JSON.stringify(cell)}}`);
    };

    const ScrollTo = React.useCallback( (top, left) => {
        let y = (top>position.top) ? position.height+top-3 : top; 
        gridRef.current.scrollTo(0,y);
      }, [position]);

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            ScrollTo,
            set OnScroll (value) {
                onScrollEventRef.current = value;
            }, 
            get Name () {
                return gridName.current;
            },
        }),
        [ ScrollTo ]
    );

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
        <div onContextMenu={(e)=> e.preventDefault()} >
            <DataEditorContainer width={1000} height={gridHeight}>
                <DataEditor 
                    ref={gridRef} 
                    getCellContent={props.getCellContent} 
                    columns={props.columns} 
                    rows={props.rows}
                    onVisibleRegionChanged={ onVisibleRegionChanged }
                    freezeColumns={props.freezeColumns}
                    getRowThemeOverride={props.getRowThemeOverride}
                    getCellsForSelection={props.getCellsForSelection}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    onCellContextMenu={onCellContextMenu}
                    onCellClicked={onCellClicked}
                    
                />
            </DataEditorContainer>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: anchorPos.y,
                    horizontal: anchorPos.x,
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                // style={{
                //     top: -100,
                //     left: 100,
                // }}
                >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export const ScrollableGrid = React.forwardRef(ScrollableGridImpl);