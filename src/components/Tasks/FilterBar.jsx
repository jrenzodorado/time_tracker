import * as React from 'react';
import { useState, useEffect } from 'react';
import TwoDatePicker from './TwoDatePicker';
import { TextField, Button } from '@mui/material';
import AlertDate from './AlertDate';
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
/**
 * FilterBar consists the filter components,
 * @param  {handleSearch} handler for filtering tasks 
 * @state {filter} contains the queries
 * @state {open} state to show alert error for dates select
 * @function {updateFilter} update filter and error if date2 < date1
 * @function {handleDate1} check if valid wrt date2
 * @function {handleDate2} check if valid wrt date1
 * @function {handleTagChange} updates filter.tag
 */
const FilterBar = ({ handleSearch }) => {
  const [filter, setFilter] = useState({ date1: null, date2: null, tag: '', error: false });
  const [open, setOpen] = useState(false);

  const alertClose = () => {
    setOpen(false);
  }
  const updateFilter = (dateType, newDate, isValid) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [dateType]: newDate,
      error: !isValid
    }));
    
    if (!isValid) {
      setOpen(true);
    }
  };
  
  const handleDate1 = (newDate1) => {
    const isValid = filter.date2 == null || newDate1 <= filter.date2;
    updateFilter('date1', newDate1, isValid);
  };
  
  const handleDate2 = (newDate2) => {
    const isValid = filter.date1 && newDate2 >= filter.date1;
    updateFilter('date2', newDate2, isValid);
  };
  

  const handleTagChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      tag: event.target.value,
    }));
  };

  return (
    <>{open && <AlertDate open={open} onClose={alertClose} />}
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
            disabled={filter.error}
            onClick={() => handleSearch(filter)}
          >
            Search
          </Button>
        </div>
      </div></>
  );
};

export default FilterBar;
