import { useState } from 'react';
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

const TwoDatePicker = () => {
  const [value, setValue] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: { sx: datePickerStyles },
        }}
      />
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: { sx: datePickerStyles },
        }}
      />
    </div>
  );
};

export default TwoDatePicker;
