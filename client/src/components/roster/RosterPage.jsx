import {
  GridCellKind,
  DataEditorContainer,
  DataEditor
} from "@glideapps/glide-data-grid";

const columns = [
  { title: "Number", width: 200 },
  { title: "Square", width: 200 }
];

function getData([col, row]) {
  let n;
  if (col === 0) {
    n = row;
  } else if (col === 1) {
    n = row * row;
  } else {
    throw new Error("This should not happen");
  }
  return {
    kind: GridCellKind.Number,
    data: n,
    displayData: n.toString(),
    allowOverlay: false
  };
}

function RostersPage() {
  return (
    <div>
      <DataEditorContainer width={500} height={500}>
        <DataEditor getCellContent={getData} columns={columns} rows={9000} />
      </DataEditorContainer>
    </div>
  );
}


export default RostersPage;
