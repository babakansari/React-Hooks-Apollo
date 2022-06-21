import * as React from 'react';

export const useScrollableGrids = (gridRefs, onScrolling) => {
    const onScroll = React.useCallback((e) => {
      if (!e.target || !e.target.current) {
        return;
      }
      for (const gridRef of gridRefs) {
        if (gridRef === e.target) {
          if (onScrolling) {
            onScrolling(e);
          }

          continue;
        }
        gridRef.current.ScrollTo(e.position.top);
      }
    }, [gridRefs, onScrolling]);

    const bind = React.useCallback( (gridRef) => {
      if (!gridRef.current) {
        return;
      }
      gridRef.current.OnScroll = (e) => {
        onScroll(e);
      };
    }, [onScroll]);

    React.useEffect( ()=>{

      for (const gridRef of gridRefs) {
        bind(gridRef);
      }
    
    }, [gridRefs, bind] );

    return {
      OnScroll: onScroll,
      Bind: bind,
    };
}