import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';

// Typy pro sloupce a data
interface Column {
  field: string;
  headerName: string;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, row: any) => React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  noDataMessage?: string;
}

// Stylované TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Stylované TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  cursor: 'pointer',
}));

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  onRowClick,
  noDataMessage = 'This table is empty.',
}) => {
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.field}
                align={column.align || 'left'}
              >
                {column.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex} onClick={() => handleRowClick(row)}>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  align={column.align || 'left'}
                >
                  {column.render
                    ? column.render(row[column.field], row)
                    : row[column.field]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <Alert severity="warning">{noDataMessage}</Alert>}
    </TableContainer>
  );
};

export default CustomTable;
