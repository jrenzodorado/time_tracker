import React, { useState } from 'react'
import axios from 'axios';
const Login = ({ setLoggedInUser, register }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const { username, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    let api_url = "https://time-tracker-api-3ixy.onrender.com/users/";
    const onSubmit = async e => {
        e.preventDefault();
        try {
            api_url = api_url + (register ? 'register' : 'login');
            const res =
                await axios.post(api_url,
                    {
                        username: username,
                        password: password
                    });
            localStorage.setItem('token', res.data.token);
            setLoggedInUser(res.data.userId);

            // Set success message
            setMessage('Logged in successfully');
            setFormData({
                ...formData,
                password: ''
            });
        } catch (err) {
            // Set error message
            setMessage('Invalid credentials');
        }
    };
    return (

        <div className="flex items-start justify-center min-h-screen bg-gray-100">
            <form className=" bg-white p-6 rounded-lg shadow-md  min-w-[400px] mt-10" onSubmit={onSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-white border border-orange-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        placeholder="name@thinkingmachines.com"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Your password</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-white border border-orange-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <p className="text-xs text-gray-500 mb-5">{message}</p>
                <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>


    )
}

export default Login