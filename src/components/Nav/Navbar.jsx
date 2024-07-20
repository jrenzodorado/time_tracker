import React from 'react'

const Navbar = ({ user, register, handleLogout, handleRegister }) => {
    return (
        <div className='text-orange-500 flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
            <h1 className='w-full text-3xl font-bold text-orange-500'>Time Tracker</h1>
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
                    <li className='p-2 list-item' onClick={handleLogout}>Logout</li>
                }
            </ul>
        </div>
    )
}

export default Navbar