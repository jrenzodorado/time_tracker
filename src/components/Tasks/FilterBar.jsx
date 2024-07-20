import * as React from 'react';
import TwoDatePicker from './TwoDatePicker';
import { TextField, Button } from '@mui/material';

const textFieldStyles = {
  '& .MuiInputLabel-root': {
    fontSize: '12px',
    color: 'grey',
    transition: 'color 0.2s',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '12px',
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

const buttonStyles = {
  color: 'gray',
  '&:hover': {
    color: 'orange',
    backgroundColor: 'transparent',
  },
};

const FilterBar = () => {
  return (
    <div
      className="m-1"
      style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <div style={{ flex: '2', minWidth: '100px' }}>
        <TwoDatePicker />
      </div>
      <div style={{ flex: '1', minWidth: '100px' }}>
        <TextField
          id="outlined-search"
          label="TAG"
          type="search"
          fullWidth
          sx={textFieldStyles}
        />
      </div>
      <div style={{ flex: '1', minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="text"
          sx={buttonStyles}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
