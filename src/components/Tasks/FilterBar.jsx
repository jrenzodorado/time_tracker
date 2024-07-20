import * as React from 'react';
import { useState } from 'react';
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

const FilterBar = ({ handleSearch }) => {
  const [filter, setFilter] = useState({ date1: null, date2: null, tag: '' });

  const handleDate1 = (newDate1) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      date1: newDate1,
    }));
  };

  const handleDate2 = (newDate2) => {
    // if (filter.date1 && newDate2 >= filter.date1) {
    // Update the state if the validation passes
    setFilter((prevFilter) => ({
      ...prevFilter,
      date2: newDate2,
    }));
  };

  const handleTagChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      tag: event.target.value,
    }));
  };
  return (
    <div
      className="m-1"
      style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <div style={{ flex: '2', minWidth: '100px' }}>
        <TwoDatePicker
          date1={filter.date1}
          date2={filter.date2}
          handleDate1={handleDate1}
          handleDate2={handleDate2}
        />
      </div>
      <div style={{ flex: '1', minWidth: '100px' }}>
        <TextField
          id="outlined-search"
          label="TAG"
          type="search"
          fullWidth
          sx={textFieldStyles}
          value={filter.tag} // Set the value of the TextField
          onChange={handleTagChange} // Add the onChange handler
        />
      </div>
      <div style={{ flex: '1', minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="text"
          sx={buttonStyles}
          onClick={() => handleSearch(filter)}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
