import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import FilterBar from './FilterBar';

const TimeTracker = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [open, setOpen] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [newItem, setNewItem] = useState(false);
    const handleDelete = (taskId) => {
        setToDelete(taskId);
        setOpen(true);
    };
    const handleClose = async (confirm) => {
        if (confirm) {
            try {
                // Make the DELETE request
                await axios.delete(`https://time-tracker-api-3ixy.onrender.com/tasks/${toDelete}`);
                // Update the state to remove the deleted task
                setTasks(prevTasks => prevTasks.filter(task => task._id !== toDelete));
            } catch (error) {
                console.error('Error deleting the task:', error);
            }
        }
        setOpen(false);
    };
    const handleNew = async (confirm, data) => {
        if (confirm) {
            setTasks(prevTasks => [...prevTasks, data.taskItem]);
        }
        setNewItem(false);
    }
    const handleCreate = () => {
        setNewItem(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth();
                // First day of the current month at 00:00:00
                const cdate1 = new Date(year, month, 1);
                const date1ISOString = `${cdate1.toISOString().split('T')[0]}T00:00:00.000Z`;
                setDate1(date1ISOString);
                // Last day of the current month at 23:59:59
                const cdate2 = new Date(year, month + 1, 0);
                const date2ISOString = `${cdate2.toISOString().split('T')[0]}T23:59:59.999Z`;
                setDate2(date2ISOString);


                const res = await axios.get('https://time-tracker-api-3ixy.onrender.com/tasks/', {
                    params: {
                        userId: user,
                        date1: date1ISOString,
                        date2: date2ISOString
                    }
                });

                setTasks(res.data);

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [user]); // Adding user as a dependency to refetch when user changes

    return (
        <>
            <DeleteDialog open={open} handleClose={handleClose} />
            <CreateDialog openNew={newItem} handleNew={handleNew} user={user} />
            <div className="flex flex-col items-center min-h-screen bg-gray-100">
                <div className='bg-white rounded-lg shadow-md min-w-[400px] md:min-w-[750px] mt-10 mx-auto'>
                    <FilterBar />
                    <TaskTable
                        tasks={tasks}
                        handleDelete={handleDelete}
                        handleCreate={handleCreate}
                        className="w-full"
                    />
                </div>
            </div>


        </>
    );
};

export default TimeTracker;
