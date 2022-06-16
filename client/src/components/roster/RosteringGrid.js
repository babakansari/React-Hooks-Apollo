import * as React from 'react';
import {
    DataEditorContainer,
    DataEditor
  } from "@glideapps/glide-data-grid";

const RosteringGridComponent = (props, forwardedRef) => {
    const gridRef = React.useRef(null);
    const [position, setPosition] = React.useState(0);
    const rowHeight = props.rowHeight ? props.rowHeight : 34;
    const headerHeight = props.headerHeight ? props.headerHeight : 36;
    const visibleRows = props.visibleRows;
    const epsilon = 20;
    const gridHeight = visibleRows*(rowHeight+1) + headerHeight+1 + epsilon;

    const onVisibleRegionChanged = ( range, tx, ty ) => {
        const currentPosition = {
            top: range.y,
            left: range.x,
            height: range.height,
            width: range.width
        };
        props.onScroll(currentPosition);
        setPosition(currentPosition);
    };
    
    const ScrollTo =  React.useCallback( (top, left) => {
        let y = (top>position.top) ? position.height+top-3 : top; 
        gridRef.current.scrollTo(0,y);
      });

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            ScrollTo,
        }),
        [ ScrollTo ]
    );
    
    return (
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
            />
        </DataEditorContainer>
    );
}

export const RosteringGrid = React.forwardRef(RosteringGridComponent);