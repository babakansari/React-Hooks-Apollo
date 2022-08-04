import * as React from 'react';
import { DataEditor } from '@glideapps/glide-data-grid';
import { GridEvent, GridPosition } from './ScrollableGridTypes';

const ScrollableGridImpl = (props, forwardedRef) => {
  const gridRef = React.useRef(null);
  const gridName = React.useRef(props.name);
  const [position, setPosition] = React.useState(GridPosition(0,0,0,0));
  const epsilon = 20;
  const rowHeight = props.rowHeight ? props.rowHeight : 34;
  const headerHeight = props.headerHeight ? props.headerHeight : 36;
  const height = props.height;
  const rowsTotalHeight = height - headerHeight - epsilon - 1;
  const visibleRows =
    props.visibleRows || Math.floor(rowsTotalHeight / (rowHeight + 1)) - 1;
  const gridHeight = visibleRows * (rowHeight + 1) + headerHeight + 1 + epsilon;
  const onScrollEventRef = React.useRef(null);
  const OnDecorateCell = props.OnDecorateCell;
  const [p, setP] = React.useState(GridPosition(0,0,0,0));

  const onVisibleRegionChanged = React.useCallback(
    (range, tx, ty) => {
      if (!onScrollEventRef) {
        return;
      }
      const currentPosition = GridPosition(
        range.y,
        range.x,
        range.height,
        range.width
      );
      const event = GridEvent(forwardedRef, currentPosition);
      if (onScrollEventRef.current) {
       onScrollEventRef.current(event);
      } 
      console.log(`grid, position = (${gridName.current}, ${JSON.stringify(currentPosition)})`);
      setPosition(currentPosition);
    },
    [onScrollEventRef, forwardedRef]
  );

  const _getEffectiveWidth =  React.useCallback(() => {
    if(!gridRef.current){
      return props.width;
    }
    let totalWith = 0;
    let col = 0;
    while( totalWith<=props.width ){
      const bounds = gridRef.current.getBounds(col,1);
      if(!bounds){
        break;
      }
      totalWith += bounds.width;
      col++;
    }
    return totalWith-col+1;
  }, [gridRef.current]);

  const onDrawCustomCell = (ctx, cell, theme, rect, hoverAmount) => {
    const underlinedText = (
      ctx,
      text,
      rect,
      leftOffset,
      topOffset,
      color,
      thickness
    ) => {
      const { x, y, height } = rect;
      const textMeasure = ctx.measureText(text);
      const textWidth = textMeasure.width;
      const textHeight =
        (textMeasure.fontBoundingBoxAscent +
          textMeasure.fontBoundingBoxDescent) /
        2 | height/2 - 2;
      ctx.save();
      ctx.fillStyle = color;
      ctx.fillText(text, x + leftOffset, y + textHeight + topOffset);
      ctx.fillRect(
        x + leftOffset,
        y + height - topOffset,
        textWidth,
        thickness
      );
      ctx.restore();
    };

    if (cell.kind !== 'text') 
        return false;

    if (OnDecorateCell) {
      switch (OnDecorateCell(cell)) {
        case 'overline':
        case 'underline':
          underlinedText(ctx, cell.displayData, rect, 9, 2, 'black', 1);
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  const ScrollTo = React.useCallback(
    (top, left) => {
      left = left + props.freezeColumns;
      const currentLeft = position.left ;
      const currentWidth = position.width - props.freezeColumns;
      const y = top > position.top ? position.height + top - 3 : top;
      const x = left > currentLeft ? currentWidth + left - 3 : left;

      gridRef.current.scrollTo(x, y);
      setP(GridPosition(y,x,position.heigh,position.width));
    },
    [position]
  );

  React.useImperativeHandle(
    forwardedRef,
    () => ({
      ScrollTo,
      set OnScroll(value) {
        onScrollEventRef.current = value;
      },
      get Name() {
        return gridName.current;
      },
      get TotalRows() {
        return props.rows;
      },
      get VisibleRows() {
        return visibleRows;
      },
      get TotalCols() {
        return props.columns.length;
      },
      get VisibleCols() {
        return position.width | 0;
      },
    }),
    [ScrollTo, props.rows, visibleRows]
  );

  const getCellContent2 =(cell) => {
    const [col, row] = cell;
    const result = props.getCellContent(cell);
    if(col.toString() === p.left.toString() && row.toString() === p.top.toString()){
        result.themeOverride = {
          textDark: "#115588",
          baseFontStyle: "bold 13px",
          bgCell: "#F2F9FF",
      }
    }
    
    return result;
  }

  return (
    <DataEditor
      ref={gridRef}
      width={_getEffectiveWidth()}
      height={gridHeight}
      getCellContent={getCellContent2}
      onItemHovered={props.onItemHovered}
      columns={props.columns}
      rows={props.rows}
      onVisibleRegionChanged={onVisibleRegionChanged}
      freezeColumns={props.freezeColumns}
      getRowThemeOverride={props.getRowThemeOverride}
      getCellsForSelection={props.getCellsForSelection}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      onCellContextMenu={props.onCellContextMenu}
      drawCustomCell={onDrawCustomCell}
    />
  );

};

export const ScrollableGrid = React.forwardRef(ScrollableGridImpl);
