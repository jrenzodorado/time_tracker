import React, { useState } from 'react';
import Login from "../Auth/Login";
import Navbar from "./Navbar";
import TimeTracker from '../Tasks/TimeTracker';


/**
 * Home used to contain children components
 * @state {user} 
 * @state {register} indicates register or login
 * @function {handleLogin} handler to set user
 * @function {handleLogout} handler to remove user from session
 * @function {handleRegister} handler to toggle the register boolean
 */
const Home = () => {
    const [user, setUser] = useState(null);
    const [register, setRegister] = useState(false);

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleRegister = () => {
        setRegister(prevState => !prevState);
    };

    return (
        <div>
            <Navbar
                user={user}
                register={register}
                handleLogout={handleLogout}
                handleRegister={handleRegister}
            />
            {!user &&
                <div className='homeBody min-h-screen'>

                    <Login
                        setLoggedInUser={handleLogin}
                        register={register}
                    />

                </div>
            }
            {user &&
                <TimeTracker user={user} />
            }
        </div >
    );
}

export default Home;
