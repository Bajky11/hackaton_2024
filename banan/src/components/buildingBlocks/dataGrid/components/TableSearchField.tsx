import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TableSearchFieldParams {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  flex?: number;
}

export function TableSearchField({
  value,
  setValue,
  flex = 1,
}: TableSearchFieldParams) {
  return (
    <TextField
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ flexGrow: flex }}
      size={'small'}
      label="Search everything in table..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
