import React from 'react'
import Login from "../Auth/Login";
import Navbar from "./Navbar";
import { useState } from "react";
import TimeTracker from '../Tasks/TimeTracker';
const Home = () => {
    const [user, setUser] = useState(null)
    const [register, setRegister] = useState(false)
    const handleLogin = (user) => {
        setUser(user);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    const handleRegister = () => {
        setRegister(prevState => !prevState);
    }
    return (
        <div>
            <Navbar user={user}
                register={register}
                handleLogout={handleLogout}
                handleRegister={handleRegister}
            />
            {!user ?
                <Login setLoggedInUser=
                    {handleLogin}
                    register={register}
                /> : <TimeTracker user={user} />
            }
        </div>
    )
}

export default Home