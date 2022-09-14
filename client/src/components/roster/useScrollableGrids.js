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

  const _syncScrollToVert = React.useCallback(
    (target, top) => {
      for (const gridRef of gridRefs) {
        if (gridRef === target) {
          if (onScrolling) {
            onScrolling({ target, top, left: undefined });
          }
          continue;
        }

        if (gridRef.current && gridRef.current.ScrollToVertical) {
          const currentTop = gridRef.current.GetTop(target, top);
          gridRef.current.ScrollToVertical(currentTop);
        }
      }
    },
    [gridRefs, onScrolling]
  );

  const _syncScrollToHorz = React.useCallback(
    (target, left) => {
      for (const gridRef of gridRefs) {
        if (gridRef === target) {
          if (onScrolling) {
            onScrolling({ target, top: undefined, left });
          }
          continue;
        }

        if (gridRef.current && gridRef.current.ScrollToHorizontal) {
          const currentLeft = gridRef.current.GetLeft(target, left);
          gridRef.current.ScrollToHorizontal(currentLeft);
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
      _syncScrollToHorz(e.target, e.position.left);
      _syncScrollToVert(e.target, e.position.top);
    };

    for (const gridRef of gridRefs) {
      if (!gridRef.current) {
        continue;
      }

      gridRef.current.OnScroll = onScroll;
    }
  }, [gridRefs, _syncScrollToHorz, _syncScrollToVert]);

  return {
    ScrollTo,
    OnScroll,
  };
};
