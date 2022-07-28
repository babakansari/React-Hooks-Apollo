import * as React from 'react';

export const useScrollableGrids = (gridRefs) => {
  const locksRef = React.useRef(0);
  let onScrolling = null;
  const OnScroll = (scrollEvent) => {
    onScrolling = scrollEvent;
  };
 
  const ScrollTo = (top, left) => {
    if (gridRefs.length < 1) {
      throw new RangeError('No grid is in the set');
    }
    const y = _convertToNumber(top);
    const x = _convertToNumber(left);
    const gridRef = gridRefs[0];
    gridRef.current.ScrollTo(y, x);
  };

  const _convertToNumber = (value) => {
    const number = parseInt(value);
    if (isNaN(number)) {
      throw new TypeError(`${value} is not a number`);
    }
    return number;
  };

  const _calculateTop = (gridRef, target, top) => {
    const targetRows = target.current.TotalRows - target.current.VisibleRows;
    const currentRows = gridRef.current.TotalRows - gridRef.current.VisibleRows;
    return Math.ceil((currentRows / targetRows) * top);
  };
  

  const _syncScrollTo = React.useCallback(
    (target, top, left) => {
      for (const gridRef of gridRefs) {
        if (gridRef === target) {
          if (onScrolling) {
            onScrolling({ target, top, left });
          }
          continue;
        }
        
        if (gridRef.current && gridRef.current.ScrollTo) {
          const currentTop = _calculateTop(gridRef, target, top);
          
          gridRef.current.ScrollTo(currentTop, left);
        }
      }
    },
    [gridRefs, onScrolling]
  );
 
  React.useEffect(() => {
    const onScroll = (e) => {
      if (!e.target || !e.target.current) {
        return;
      }

      if (locksRef.current > 0) {
        locksRef.current -= 1; // Release a lock
        return;
      }
      locksRef.current = gridRefs.length - 1; // Acquire locks
      _syncScrollTo(e.target, e.position.top, e.position.left);
    };

    for (const gridRef of gridRefs) {
      if (!gridRef.current) {
        continue;
      }

      gridRef.current.OnScroll = onScroll;
    }
  }, [gridRefs, _syncScrollTo]);

  return {
    ScrollTo,
    OnScroll,
  };
};
