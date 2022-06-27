import * as React from 'react';

export const useScrollableGrids = (gridRefs, deps) => {
  const locksRef = React.useRef(0);
  let onScrolling = null;
  const OnScroll = (scrollEvent) => {onScrolling = scrollEvent};

  const ScrollTo = (top, left) => {
    const y = _convertToNumber(top);

    if( gridRefs.current.length <1){
      throw new RangeError("No grid is in the set");
    }
    const gridRef = gridRefs.current[0];
    
    gridRef.current.ScrollTo(y, left);
  }

  const _convertToNumber = (value) => {
    const number = parseInt(value);
    if (isNaN(number)) { 
      throw new TypeError(`${value} is not a number`);
    }
    return number;
  }

  const _syncScrollTo = React.useCallback( (target, top, left) => {
    for (const gridRef of gridRefs.current) {
      if (gridRef === target) {
        if(onScrolling) {
          onScrolling({target, top, left});
        }
        continue;
      }
      gridRef.current.ScrollTo(top, left);
    }
  }, [gridRefs, onScrolling, ...deps]);

  React.useEffect( ()=>{
    const onScroll = (e) => {
      if (!e.target || !e.target.current) {
        return;
      }
      
      if (locksRef.current > 0) {
        locksRef.current -= 1; // Release a lock
        return;
      }
      locksRef.current = gridRefs.current.length - 1; // Acquire locks

      _syncScrollTo(e.target, e.position.top, e.position.left);
    };

    for (const gridRef of gridRefs.current) {
      if(!gridRef.current){
        continue;
      }
      gridRef.current.OnScroll = onScroll;
    }
  
  }, [gridRefs, _syncScrollTo, ...deps] );

  return {
    ScrollTo,
    OnScroll
  };
}