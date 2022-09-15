import * as React from 'react';
import { DataEditor } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { GridEvent, GridPosition } from './ScrollableGridTypes';

const ScrollableGridImpl = (props, forwardedRef) => {
  const gridRef = React.useRef(null);
  const portalRef = React.useRef(null);
  const gridName = React.useRef(props.name);
  const onScrollEventRef = React.useRef(null);
  const OnDecorateCell = props.OnDecorateCell;
  const [position, setPosition] = React.useState(GridPosition(0, 0, 0, 0));
  // Vertical scrolling parameter
  const rowHeight = props.rowHeight ? props.rowHeight : 34;
  const headerHeight = props.headerHeight ? props.headerHeight : 36;
  const visibleRows = position.height | 0;
  const totalRows = props.rows;

  // Horizontal scrolling parameters
  const visibleCols = position.width | 0;
  const totalCols = props.columns.length;

  const onVisibleRegionChanged = (range, tx, ty) => {
    if (!onScrollEventRef) {
      return;
    }
    const currentPosition = GridPosition(
      range.y,
      range.x - props.freezeColumns,
      range.height,
      range.width
    );
    const event = GridEvent(forwardedRef, currentPosition);
    if (onScrollEventRef.current) {
      onScrollEventRef.current(event);
    }

    setPosition(currentPosition);
  };

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
        ((textMeasure.fontBoundingBoxAscent +
          textMeasure.fontBoundingBoxDescent) /
          2) |
        (height / 2 - 2);
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

    if (cell.kind !== 'text') return false;

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

  const ScrollToHorizontal = React.useCallback(
    (left) => {
      const x = left + props.freezeColumns;
      gridRef.current.scrollTo(
        { amount: x, unit: 'cell' },
        0,
        'horizontal',
        0,
        0,
        { hAlign: 'start' }
      );
    },
    [props.freezeColumns]
  );

  const ScrollToVertical = React.useCallback((top) => {
    gridRef.current.scrollTo(
      0,
      { amount: top, unit: 'cell' },
      'vertical',
      0,
      0,
      {
        vAlign: 'start',
      }
    );
  }, []);

  const GetTop = React.useCallback(
    (target, top) => {
      const targetRows = target.current.TotalRows - target.current.VisibleRows;
      const currentRows = totalRows - visibleRows;
      return Math.ceil((currentRows / targetRows) * top) | top;
    },
    [totalRows, visibleRows]
  );

  const GetLeft = React.useCallback(
    (target, left) => {
      const targetCols = target.current.TotalCols - target.current.VisibleCols;
      const currentCols = totalCols - visibleCols;
      const currentLeft = Math.ceil((currentCols / targetCols) * left) | left;
      return currentLeft;
    },
    [totalCols, visibleCols]
  );

  React.useImperativeHandle(
    forwardedRef,
    () => ({
      ScrollToHorizontal,
      ScrollToVertical,
      GetTop,
      GetLeft,
      set OnScroll(value) {
        onScrollEventRef.current = value;
      },
      get Name() {
        return gridName.current;
      },
      get TotalRows() {
        return totalRows;
      },
      get VisibleRows() {
        return visibleRows;
      },
      get TotalCols() {
        return totalCols;
      },
      get VisibleCols() {
        return visibleCols;
      },
    }),
    [
      ScrollToHorizontal,
      ScrollToVertical,
      GetTop,
      GetLeft,
      totalRows,
      visibleRows,
      totalCols,
      visibleCols,
    ]
  );

  return (
    <div
      ref={portalRef}
      id="gridPortal"
      style={{ width: props.width, height: props.width }}
    >
      <DataEditor
        ref={gridRef}
        width={'100%'}
        height={'100%'}
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
    </div>
  );
};

export const ScrollableGrid = React.forwardRef(ScrollableGridImpl);
