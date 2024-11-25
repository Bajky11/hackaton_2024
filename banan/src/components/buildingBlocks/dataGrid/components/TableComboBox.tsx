import React from 'react';
import { Autocomplete, TextField, useColorScheme, useTheme } from '@mui/material';

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
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <Autocomplete
      loading={loading}
      disablePortal
      options={options}
      size={'small'}
      sx={{
        flexGrow: flex,
        backgroundColor: colorScheme === "light" ? theme.palette.background.default : "#1e1e1e"
      }}
      value={value}
      onChange={(event, newValue) => setValue(newValue || '')}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
