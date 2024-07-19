import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
const DeleteDialog = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ backgroundColor: 'rgb(249 115 22)', color: 'white', padding:'5px', fontSize:'16px' }}>Delete</DialogTitle>
            <DialogContent sx={{marginTop:'5px'}}>
                <DialogContentText id="alert-dialog-description" sx={{fontSize:'12px'}}>
                    Are you sure you want to delete your check-in?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose(false)}
                    sx={{
                        color: 'rgb(249 115 22)',
                        '&:hover': {
                            backgroundColor: 'rgb(249 115 22)',
                            color: 'white',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleClose(true)}
                    autoFocus
                    sx={{
                        color: 'rgb(249 115 22)',
                        '&:hover': {
                            backgroundColor: 'rgb(249 115 22)',
                            color: 'white',
                        },
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog