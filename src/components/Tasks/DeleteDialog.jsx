import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const dialogTitleStyles = {
    backgroundColor: 'rgb(249 115 22)',
    color: 'white',
    padding: '5px',
    fontSize: '16px',
};

const dialogContentTextStyles = {
    fontSize: '12px',
};

const customButtonStyles = {
    color: 'rgb(249 115 22)',
    '&:hover': {
        backgroundColor: 'rgb(249 115 22)',
        color: 'white',
    },
};

const CustomButton = ({ onClick, autoFocus, children }) => (
    <Button
        onClick={onClick}
        autoFocus={autoFocus}
        sx={customButtonStyles}
    >
        {children}
    </Button>
);

const DeleteDialog = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={dialogTitleStyles}>
                Delete
            </DialogTitle>
            <DialogContent sx={{ marginTop: '5px' }}>
                <DialogContentText id="alert-dialog-description" sx={dialogContentTextStyles}>
                    Are you sure you want to delete your check-in?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={() => handleClose(false)}>Cancel</CustomButton>
                <CustomButton onClick={() => handleClose(true)} autoFocus>
                    Confirm
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
