import * as React from 'react';
import { DataEditor } from '@glideapps/glide-data-grid';
import { GridEvent, GridPosition } from './ScrollableGridTypes';

 

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
  const OnDecorateCell = props.OnDecorateCell;

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
      setPosition(currentPosition);
    },
    [onScrollEventRef, forwardedRef]
  );

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
        2;
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
      let y = top > position.top ? position.height + top - 3 : top;
      gridRef.current.scrollTo(0, y);
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
    }),
    [ScrollTo, props.rows, visibleRows]
  );

  return (
    <DataEditor
      ref={gridRef}
      width={1000}
      height={gridHeight}
      getCellContent={props.getCellContent}
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
