import * as React from 'react';

export const useScrollableGrids = (gridRefs,  onScrolling) => {
  const locksRef = React.useRef(0);

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

      for (const gridRef of gridRefs.current) {
        if (gridRef === e.target) {
          if (onScrolling) {
            onScrolling(e);
          }
          continue;
        }
        gridRef.current.ScrollTo(e.position.top);
      }
    };

    for (const gridRef of gridRefs.current) {
      gridRef.current.OnScroll = onScroll;
    }
  
  }, [gridRefs, onScrolling] );

}