import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const datePickerStyles = {
  '& .MuiInputBase-input': {
    fontSize: '12px',
  },
  '& .MuiInputAdornment-root:hover .MuiSvgIcon-root': {
    color: 'rgb(249 115 22)',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '12px',
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};
/**
 * Customized DatePicker from materials ui
 * @param {date1} Date
 * @param {date2} Date
 * @param {handleDate1} handler
 * @param {handleDate2} handler
 */
const TwoDatePicker = ({ date1, date2, handleDate1, handleDate2 }) => {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <DatePicker
        value={date1}
        onChange={(newValue) => handleDate1(newValue)}
        slotProps={{
          textField: { sx: datePickerStyles },
        }}
      />
      <DatePicker
        value={date2}
        onChange={(newValue) => handleDate2(newValue)}
        slotProps={{
          textField: { sx: datePickerStyles },
        }}
      />
    </div>
  );
};

export default TwoDatePicker;
