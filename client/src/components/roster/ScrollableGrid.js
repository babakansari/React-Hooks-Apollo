import * as React from 'react';
import { DataEditor } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { GridEvent, GridPosition } from './ScrollableGridTypes';

const ScrollableGridImpl = (props, forwardedRef) => {
  const gridRef = React.useRef(null);
  const portalRef = React.useRef(null);
  const gridName = React.useRef(props.name);
  const [position, setPosition] = React.useState(
    GridPosition(0, props.freezeColumns, 0, 0)
  );
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
  const totalRows = props.rows;
  const totalCols = props.columns.length;
  const visibleColsRef = React.useRef(position.width | 0);

  const onVisibleRegionChanged = (range, tx, ty) => {
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
      const _getVisibleCols = () => {
        if (!gridRef.current || !portalRef) {
          return props.width;
        }
        let totalWith = 0;
        let col = 0;
        const portalEle =
          portalRef.current.getElementsByClassName('dvn-scroller')[0];
        while (totalWith < portalEle.clientWidth) {
          const bounds = gridRef.current.getBounds(col, 0);
          if (!bounds) {
            break;
          }
          totalWith += bounds.width;
          col++;
        }
        return col;
      };

      const _visibleCols = _getVisibleCols();
      visibleColsRef.current = _visibleCols;
      left = left + props.freezeColumns;
      const currentWidth = _visibleCols - props.freezeColumns;
      const x = left > position.left ? currentWidth + left - 1 : left;
      gridRef.current.scrollTo(x, 0, 'horizontal');
    },
    [position.left, props.freezeColumns, props.width]
  );

  const ScrollToVertical = React.useCallback(
    (top) => {
      const y = top > position.top ? position.height + top - 3 : top;
      gridRef.current.scrollTo(0, y, 'vertical');
    },
    [position.height, position.top]
  );

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
      const currentCols = totalCols - visibleColsRef.current;
      const currentLeft = Math.ceil((currentCols / targetCols) * left) | left;
      return currentLeft - props.freezeColumns;
    },
    [props.freezeColumns, totalCols]
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
        return visibleColsRef.current;
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
    ]
  );

  return (
    <div
      ref={portalRef}
      id="gridPortal"
      style={{ width: props.width, height: gridHeight }}
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
