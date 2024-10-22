import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const CreateDialog = ({ openNew, handleNew, user }) => {
    const [activity, setActivity] = useState('');
    const [labelA, setLabelA] = useState('check-in activity');
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (event) => {
        setActivity(event.target.value);
    };

    const buttonStyles = {
        color: 'rgb(249 115 22)',
        '&:hover': {
            backgroundColor: 'rgb(249 115 22)',
            color: 'white',
        },
    };
    // POST  request to insert document in database
    const createTask = async (activity) => {
        const taskData = {
            task: activity,
            createdBy: user,
        };
        try {
            const res = await axios.post('https://time-tracker-api-3ixy.onrender.com/tasks/new', taskData);
            handleNew(true, res.data);
            setHasError(false); 
        } catch (error) {
            setLabelA('Invalid Format');
            setHasError(true); 
        }
    };

    return (
        <Dialog
            open={openNew}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    createTask(activity);
                },
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: 'rgb(249 115 22)',
                    color: 'white',
                    padding: '5px',
                    fontSize: '16px',
                }}
            >
                Create
            </DialogTitle>
            <DialogContent sx={{ marginTop: '5px' }}>
                <DialogContentText id="alert-dialog-description" sx={{ fontSize: '14px' }}>
                    Input your activity using format:<br />
                    &lt;number&gt; [hr | hrs] #&lt;tag&gt; &lt;activities&gt;&lt;/activities&gt;
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="checkin"
                    name="checkin"
                    label={labelA}
                    type="text"
                    fullWidth
                    variant="standard"
                    value={activity}
                    onChange={handleInputChange}
                    sx={{
                        '& .MuiInputBase-input': {
                            fontSize: '12px',
                        },
                        '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                            borderBottomColor: 'orange',
                        },
                        '& .MuiInputLabel-root': {
                            color: hasError ? 'red' : 'orange',
                            '&.Mui-focused': {
                                color: hasError ? 'red' : 'orange',
                            },
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleNew(false, '')} sx={buttonStyles}>Cancel</Button>
                <Button type="submit" sx={buttonStyles}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDialog;
