import React, { useRef, useEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { DataGrid } from '@mui/x-data-grid';
import { useColorScheme, useTheme } from '@mui/material';

export function StyledResponsiveDataGrid({ ...props }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  // Nastavení počáteční šířky na straně klienta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth); // Inicializace pouze na klientské straně
    }
  }, []);

  // Použití resize observeru k dynamické změně šířky
  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
  });

  // TODO - Předělat na Matějův virtualizovaný table
  return (
    <DataGrid
      columns={props.columns}
      rows={props.rows}
      {...props}
      sx={{
        backgroundColor: colorScheme === "light" ? theme.palette.background.default : "#1e1e1e",
        '& .MuiDataGrid-root': {
          width, // Dynamicky nastavuje šířku tabulky
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: 16,
          backgroundColor: colorScheme === "light" ? theme.palette.background.default : "#1e1e1e",
        },
      }}
    />
  );
}
