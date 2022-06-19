import * as React from 'react';
import {
    DataEditorContainer,
    DataEditor
  } from "@glideapps/glide-data-grid";

const ScrollableGridImpl = (props, forwardedRef) => {
    const gridRef = React.useRef(null);
    const [position, setPosition] = React.useState(0);
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const rowHeight = props.rowHeight ? props.rowHeight : 34;
    const headerHeight = props.headerHeight ? props.headerHeight : 36;
    const visibleRows = props.visibleRows;
    const epsilon = 20;
    const gridHeight = visibleRows*(rowHeight+1) + headerHeight+1 + epsilon;
    let OnScrollEvent;

    const onVisibleRegionChanged = React.useCallback( ( range, tx, ty ) => {
        if(!OnScrollEvent || !scrollEnabled){
            return;
        }
        const currentPosition = {
            top: range.y,
            left: range.x,
            height: range.height,
            width: range.width
        };
        const event = {
            target: forwardedRef,
            position: currentPosition
        }

        if(OnScrollEvent){
            OnScrollEvent(event);
        }
        
        setPosition(currentPosition);

    }, [scrollEnabled]);
    
    const ScrollTo =  (top, left) => {
        let y = (top>position.top) ? position.height+top-3 : top; 
        gridRef.current.scrollTo(0,y);
      };

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            ScrollTo,
            set OnScroll (value) {
                OnScrollEvent = value;
            }, 
            get IsScrollEnabled () {
                return scrollEnabled;
            },
            set IsScrollEnabled (value){
                setScrollEnabled(value);
            }
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

export const ScrollableGrid = React.forwardRef(ScrollableGridImpl);