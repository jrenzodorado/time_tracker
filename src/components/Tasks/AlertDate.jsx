import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const AlertDate = ({open, onClose }) => {
    useEffect(() => {
      if (open) {
        const timer = setTimeout(() => {
          onClose();
        }, 3000); 
  
        return () => clearTimeout(timer); 
      }
    }, [open, onClose]);
  
    return open ? (
        <Alert 
          onClose={onClose} 
          severity="error"
        >
          End date must be later than or the same with start date.
        </Alert>
      ) : null;
    };
    
export default AlertDate;