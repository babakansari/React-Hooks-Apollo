import * as React from 'react';

export const useScrollableGrids = (gridRefs, onScrolling) => {
    const refs = gridRefs.current;

    React.useEffect( ()=>{
        const onScroll = (e) =>{
            if(!e.target || !e.target.current){
              return;
            }
            for(const gridRef of refs){
              if(gridRef === e.target){
                if(onScrolling){
                    onScrolling(e);
                }
                
                continue;
              }
              gridRef.current.ScrollTo(e.position.top);
            }
          };
        for(const gridRef of refs){
          gridRef.current.OnScroll = (e) => {
            onScroll(e);
          };
        }
    
      }, [refs, onScrolling] );
}