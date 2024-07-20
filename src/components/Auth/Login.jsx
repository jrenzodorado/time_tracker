import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const baseApiUrl = "https://time-tracker-api-3ixy.onrender.com/users/";

const Login = ({ setLoggedInUser, register }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'error' or 'success'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = register ? 'register' : 'login';
        const apiUrl = `${baseApiUrl}${endpoint}`;

        try {
            const { data } = await axios.post(apiUrl, formData);
            localStorage.setItem('token', data.token);
            setLoggedInUser(data.userId);
            setMessage('Logged in successfully');
            setMessageType('success'); 
            setFormData({ username: '', password: '' }); 
        } catch (err) {
            setMessage('Invalid credentials');
            setMessageType('error'); 
        }
    };

    const textFieldStyle = {
        '& .MuiInputLabel-root': {
            fontSize: '12px',
            color: 'black',
            transition: 'color 0.3s', 
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'gray',
            },
            '&:hover fieldset': {
                borderColor: 'orange',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'orange',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'orange', // Change label color when focused
        },
    };

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-md min-w-[400px] mt-10" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <TextField
                        type="email"
                        id="email"
                        label="Your email"
                        placeholder="name@thinkingmachines.com"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        fullWidth
                        sx={textFieldStyle}
                    />
                </div>
                <div className="mb-2">
                    <TextField
                        type="password"
                        id="password"
                        label="Your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        fullWidth
                        sx={textFieldStyle}
                    />
                </div>
                {message && (
                    <p className={`text-xs mb-5 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{
                        width: '100%',
                        mt: 2,
                        textTransform: 'none',
                        fontSize: '14px',
                    }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Login;
