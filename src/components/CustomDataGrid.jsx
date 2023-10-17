import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function CustomDataGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 50,
    maxColumns: 6,
  });
console.log(data)
  return (
    <div style={{ width: '100%',height:"100%",display:'flex',alignItems:"center",justifyContent:"center" }}>
      <div style={{ height: 577, width: '70%' }}>
        <DataGrid {...data} />
      </div>
    </div>
  );
}