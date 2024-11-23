import React, { useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { DataGrid } from '@mui/x-data-grid';

export function StyledResponsiveDataGrid({ ...props }) {
  const ref = useRef(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
  });

  // TODO - Předělat na Matějův virtualizovaný table
  return (
    <DataGrid
      columns={props.columns}
      {...props}
      sx={{
        '& .MuiDataGrid-root': {
          width, // Dynamicky nastavuje šířku tabulky
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: 16,
        },
      }}
    />
  );
}
