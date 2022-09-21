import * as React from 'react';

export const useScrollableGrids = (
  getGridRefs,
  syncVertical,
  syncHorizontal,
  deps
) => {
  const locksRef = React.useRef(0);
  const [syncVert, setSyncVert] = React.useState(syncVertical);
  const [syncHoriz, setSyncHoriz] = React.useState(syncHorizontal);

  React.useEffect(() => {
    setSyncVert(syncVertical);
  }, [syncVertical]);

  React.useEffect(() => {
    setSyncHoriz(syncHorizontal);
  }, [syncHorizontal]);

  let onScrolling = null;
  const OnScroll = (scrollEvent) => {
    onScrolling = scrollEvent;
  };

  const ScrollTo = (top, left) => {
    if (getGridRefs().length < 1) {
      throw new RangeError('No grid is in the set');
    }
    const y = _convertToNumber(top);
    const x = _convertToNumber(left);
    const gridRef = getGridRefs()[0];
    gridRef.current.ScrollTo(y, x);
  };

  const _convertToNumber = (value) => {
    const number = parseInt(value);
    if (isNaN(number)) {
      throw new TypeError(`${value} is not a number`);
    }
    return number;
  };

  const _syncScrollToVert = React.useCallback(
    (source, top) => {
      if (!source.current.TotalRows) {
        return;
      }
      for (const gridRef of getGridRefs()) {
        // Skip scrolling the source grid
        if (gridRef === source) {
          if (onScrolling) {
            onScrolling({ source, top, left: undefined });
          }
          continue;
        }

        if (
          gridRef.current &&
          gridRef.current.ScrollToVertical &&
          gridRef.current.TotalRows
        ) {
          const currentTop = Math.round(
            (gridRef.current.TotalRows / source.current.TotalRows) * top
          );
          gridRef.current.ScrollToVertical(currentTop);
        }
      }
    },
    [getGridRefs, onScrolling]
  );

  const _syncScrollToHorz = React.useCallback(
    (source, left) => {
      if (!source.current.TotalCols) {
        return;
      }
      for (const gridRef of getGridRefs()) {
        if (gridRef === source) {
          if (onScrolling) {
            onScrolling({ source, top: undefined, left });
          }
          continue;
        }
        if (
          gridRef.current &&
          gridRef.current.ScrollToHorizontal &&
          gridRef.current.TotalCols
        ) {
          const currentLeft = Math.round(
            (gridRef.current.TotalCols / source.current.TotalCols) * left
          );

          gridRef.current.ScrollToHorizontal(currentLeft);
        }
      }
    },
    [getGridRefs, onScrolling]
  );

  React.useEffect(() => {
    const onScroll = (e) => {
      if (!e.source || !e.source.current) {
        return;
      }

      if (locksRef.current > 0) {
        locksRef.current -= 1; // Release a lock
        return;
      }
      locksRef.current = getGridRefs().length; // Acquire locks
      if (syncHoriz) {
        // Horizontal scroll other locked grids in proportion to the source grid
        _syncScrollToHorz(e.source, e.position.left);
      }
      if (syncVert) {
        // Vertical scroll other locked grids in proportion to the source grid
        _syncScrollToVert(e.source, e.position.top);
      }
    };

    // Bind all grids scrolling events
    for (const gridRef of getGridRefs()) {
      if (!gridRef.current) {
        continue;
      }

      gridRef.current.OnScroll = onScroll;
    }
  }, [
    getGridRefs,
    _syncScrollToHorz,
    _syncScrollToVert,
    syncVert,
    syncHoriz,
    deps,
  ]);

  return {
    ScrollTo,
    OnScroll,
  };
};
