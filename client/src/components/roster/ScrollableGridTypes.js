export const GridPosition = (top, left, height, width) => {
    return {
      top,
      left,
      height,
      width,
    };
  };
  
  export const GridEvent = (source, position) => {
    return {
      source,
      position,
    };
  };
  