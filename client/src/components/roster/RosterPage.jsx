import {
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";
import * as React from 'react';
import createRowData, {getData, columns} from "./createRowData";

const ROW_COUNT = 100005;
const data = createRowData(ROW_COUNT);

function RostersPage() {
  const getContent = React.useCallback((cell) => {
    return getData(data, cell);
  }, []);

  return (
    <div>
      <DataEditorContainer width={1000} height={600} >
        <DataEditor getCellContent={getContent} columns={columns} rows={data.length} freezeColumns={4}/>
      </DataEditorContainer>
    </div>
  );
}


export default RostersPage;
