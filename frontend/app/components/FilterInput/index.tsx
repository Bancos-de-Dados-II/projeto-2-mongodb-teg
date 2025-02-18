import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface FilterInputProps {
  label: String,
  data: string[],
  disabled: boolean,
  onSelection: (selection: string | null) => void
}

export default function FilterInput({label, data, disabled, onSelection}: FilterInputProps) {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      disabled={disabled}
      autoComplete={false}
      onChange={(_, newValue) => {
        onSelection(newValue);
      }}
      options={data}
      autoHighlight
      size='small'
      getOptionLabel={(option) => option}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}
        />
      )}
    />
  );
}
