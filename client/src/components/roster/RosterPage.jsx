import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, getColumn} from "./createRowData";

const data = createRowData();
const columns = getColumn();

function RostersPage() {
  const [cols, setCols] = React.useState(columns);
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, []);

  const gridRef = React.useRef(null);

  return (
    <div>
      <DataEditorContainer width={1000} height={600} >
        <DataEditor ref={gridRef} getCellContent={getContent} columns={cols} rows={data.length} freezeColumns={4} onHeaderClicked={(colIndex, event) =>{
          gridRef.current.scrollTo(colIndex, 500);
          const newColumns = [...columns];
          newColumns[0].icon = "headerMarkdown";
          setCols(newColumns);
          console.log(`Col: ${colIndex}, Ref: ${JSON.stringify(gridRef.current.columns)}`);
        }}/>
      </DataEditorContainer>
    </div>
  );
}


export default RostersPage;
