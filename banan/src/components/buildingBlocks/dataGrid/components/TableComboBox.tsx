import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface TableComboBoxProps {
  options: string[];
  flex?: number;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
}

export function TableComboBox({
  value,
  setValue,
  options = [],
  flex = 1,
  label,
  loading = false,
}: TableComboBoxProps) {
  return (
    <Autocomplete
      loading={loading}
      disablePortal
      options={options}
      size={'small'}
      sx={{ flexGrow: flex }}
      value={value}
      onChange={(event, newValue) => setValue(newValue || '')}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
