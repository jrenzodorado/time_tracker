import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
const CreateDialog = ({ openNew, handleNew, user }) => {
    const [activity, setActivity] = useState('');
    const [labelA, setLabelA] = useState('check-in activity')
    const handleInputChange = (event) => {
        setActivity(event.target.value);
    };

    const createTask = async (activity) => {

        // Logic to handle the creation of the task using the activity value
        const taskData = {
            task: activity,
            createdBy: user
        };
        try {
            const res = await axios.post(`https://time-tracker-api-3ixy.onrender.com/tasks/new`, taskData);
            handleNew(true, res.data);
        } catch (error) {
            setLabelA('Invalid Format');
        }
        // Example API call using Axios
        // await axios.post('/api/tasks', { activity });
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
                    fontSize: '16px'
                }}>
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
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'orange',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'orange',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'orange',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'orange',
                        },
                    }}
                />
            </DialogContent>
            <DialogActions >
                <Button onClick={() => handleNew(false,'')} sx={{
                    color: 'rgb(249 115 22)',
                    '&:hover': {
                        backgroundColor: 'rgb(249 115 22)',
                        color: 'white',
                    },
                }}>Cancel</Button>
                <Button type="submit" sx={{
                    color: 'rgb(249 115 22)',
                    '&:hover': {
                        backgroundColor: 'rgb(249 115 22)',
                        color: 'white',
                    },
                }}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateDialog;
