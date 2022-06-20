import * as React from 'react';

export const useScrollableGrids = (gridRefs) => {
    const refs = gridRefs.current;
    const onScroll = (e) =>{
        if(!e.target || !e.target.current){
          return;
        }
        for(const gridRef of refs){
          if(gridRef === e.target){
            // setPosition(e.position);
            continue;
          }
          gridRef.current.ScrollTo(e.position.top);
        }
      };

    React.useEffect( ()=>{

        for(const gridRef of refs){
          gridRef.current.OnScroll = (e) => {
            onScroll(e);
          };
        }
    
      },  );
}