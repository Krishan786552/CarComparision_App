import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Dropdown = ({ options, onChange, value, style={} }) => {
  const defaultProps = {
    options,
    getOptionLabel: (option) => option.name
  };

  // Autocomplete compoenent from material ui to shwo a list of all available cars
  return (
    <Autocomplete
      {...defaultProps}
      data-testid="autocomplete"
      value={value}
      style={style}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label="Select Car" variant="standard" />
      )}
    />
  );
}

export default Dropdown;