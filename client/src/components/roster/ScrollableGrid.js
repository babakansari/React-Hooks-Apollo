import * as React from 'react';
import {
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
    const [anchorEl, setAnchorEl] = React.useState();
    const [anchorPos, setAnchorPos] = React.useState({x:0,y:0});
    const open = Boolean(anchorEl);
    const divRef = React.useRef();  

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
        const bounds =  divRef.current.getBoundingClientRect();
        setAnchorPos({ x: event.bounds.x - bounds.x, y: event.bounds.y - bounds.y});
        setAnchorEl(divRef.current);
        event.preventDefault();
    };

    const onDrawCustomCell = (ctx, cell, theme, rect, hoverAmount) => {
    
        const underlinedText = (ctx, text, rect, leftOffset, color, thickness) => {
            const { x, y, height } = rect;
            const textMeasure = ctx.measureText(text);
            const textWidth = textMeasure.width;
            const textHeight = textMeasure.fontBoundingBoxAscent + textMeasure.fontBoundingBoxDescent;

            ctx.save();
            ctx.fillStyle = color ;
            ctx.fillText(text, x + leftOffset, y + textHeight);
            ctx.fillRect(x + leftOffset, y + height - 2, textWidth-2, thickness);
            ctx.restore();
          }

        if (cell.kind !== "text" )
            return false;

        if (cell.displayData.indexOf("an")>=0){
            underlinedText(ctx, cell.displayData, rect, 10, "black" ,1);
            return true;
        }
        return false;
    };
    
    const handleClose = () => {
        setAnchorEl(null);
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
    
    return (
        <div onContextMenu={(e)=> e.preventDefault()} ref={divRef}>
            <DataEditor 
                ref={gridRef}
                width={1000}
                height={gridHeight}
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
                drawCustomCell={onDrawCustomCell}
            />
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
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export const ScrollableGrid = React.forwardRef(ScrollableGridImpl);