import React from 'react'
import UpdateIcon from '@mui/icons-material/Update';

const Navbar = ({ user, register, handleLogout, handleRegister }) => {
    return (
        <div className='flex justify-between items-center h-24 mx-auto p-2 max-w-[2300px]'>
            <h1 className='w-full text-3xl font-bold text-orange-500 flex items-center'>
                <UpdateIcon className='mr-2' fontSize='large' />
                Time Tracker
            </h1>
            <ul className='flex '>
                {!user ? (
                    <>
                        <li
                            className={`p-2 list-item ${register ? 'select-register' : ''}`}
                            onClick={!register ? handleRegister : undefined}
                        >
                            Register
                        </li>
                        <li
                            className={`p-2 list-item ${!register ? 'select-register' : ''}`}
                            onClick={register ? handleRegister : undefined}
                        >
                            Login
                        </li>
                    </>
                ) :
                    <li className='p-2 list-item' onClick={handleLogout}>
                        Logout
                    </li>
                }
            </ul>
        </div>
    )
}

export default Navbar
