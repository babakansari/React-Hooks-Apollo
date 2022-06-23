import * as React from 'react';

export const useScrollableGrids = (gridRefs,  isLock, setLock, onScrolling) => {
    
    React.useEffect( ()=>{

      const onScroll = (e) => {
        if (!e.target || !e.target.current) {
          return;
        }
        try{
          if(isLock){
            return;
          }
          setLock(true); // Acquire lock
  
          for (const gridRef of gridRefs) {
            if (gridRef === e.target) {
              if (onScrolling) {
                onScrolling(e);
              }
              continue;
            }
            gridRef.current.ScrollTo(e.position.top);
          }
  
        } finally {
          setLock(false); // Acquire lock
        }
        
      };

      for (const [key, gridRef] of gridRefs) {
        gridRef.current.Name = key;
        gridRef.current.OnScroll = onScroll;
      }
    
    }, [gridRefs] );

    return {
    };
}