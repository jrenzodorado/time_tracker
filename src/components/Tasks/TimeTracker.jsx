import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import FilterBar from './FilterBar';

/**
 * TimeTracker main component for the checkin feature,
 * @param  {user} 
 * @state {parentPage} toggle to re-render taskTable
 * @state {tasks}  state to contain tasks of user
 * @state {dateRange} state to contain initial dates
 * @state {dialogState} state to contain dialog for delete and create
 * @function {handleDelete} handler retrieving taskId of current selected task for deletion
 *            and opening DeleteDialog modal
 * @function {handleClose} on decision of DeleteDialog, a request is sent to API
 * @function {handleCreate} handler to set CreateDialog to show
 * @function {handleNew} on decision of CreateDialog, local array of tasks get updated
 * @function {toISOStringWithTime} convert to ISO and format time
 * @function {handleSearch} filters tasks depends on data callback
 * @function {fetchDefault} initial tasks are set to be within current month, called by useEffect
 */
const TimeTracker = ({ user }) => {
    const [parentPage, setParent] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [dateRange, setDateRange] = useState({ date1: null, date2: null });
    const [dialogState, setDialogState] = useState({ openDelete: false, toDelete: null, openNew: false });

    const handleDelete = useCallback((taskId) => {
        setDialogState({ openDelete: true, toDelete: taskId, openNew: false });
    }, []);

    const handleClose = useCallback(async (confirm) => {
        if (confirm && dialogState.toDelete) {
            try {
                await axios.delete(`https://time-tracker-api-3ixy.onrender.com/tasks/${dialogState.toDelete}`);
                // after server update, tasks array are locally altered not requiring another request 
                // to be made for updated list 
                setTasks(prevTasks => prevTasks.filter(task => task._id !== dialogState.toDelete));
                setParent(prevState => !prevState);
            } catch (error) {
                console.error('Error deleting the task:', error);
            }
        }
        setDialogState(prevState => ({ ...prevState, openDelete: false, toDelete: null }));
    }, [dialogState.toDelete]);

    const handleCreate = useCallback(() => {
        setDialogState(prevState => ({ ...prevState, openNew: true }));
    }, []);

    const handleNew = useCallback((confirm, data) => {
        // only updates local array as request is made in CreateDialog
        if (confirm) {
            setTasks(prevTasks => [...prevTasks, data.taskItem]);
            setParent(prevState => !prevState);
        }
        setDialogState(prevState => ({ ...prevState, openNew: false }));
    }, []);

    const toISOStringWithTime = (date, time) => {
        if (!date) return null;
        const datePart = new Date(date).toISOString().split('T')[0];
        return `${datePart}T${time}.000Z`;
    };

    const handleSearch = useCallback(async (data) => {
        const { date1, date2, tag } = data;
        const isoDate1 = toISOStringWithTime(date1, '23:59:59');

        const date2Obj = new Date(date2);
        date2Obj.setDate(date2Obj.getDate() + 1);
        const isoDate2 = toISOStringWithTime(date2Obj, '23:59:59');

        try {
            const res = await axios.get('https://time-tracker-api-3ixy.onrender.com/tasks/', {
                params: {
                    userId: user,
                    date1: isoDate1,
                    date2: isoDate2,
                    searchTag: tag
                }
            });
            setTasks(res.data);
            setParent(prevState => !prevState);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [user]);

    const fetchDefault = useCallback(async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const cdate1 = new Date(year, month, 1);
            const cdate2 = new Date(year, month + 1, 0);
            const date1ISOString = `${cdate1.toISOString().split('T')[0]}T00:00:00.000Z`;
            const date2ISOString = `${cdate2.toISOString().split('T')[0]}T23:59:59.999Z`;

            setDateRange({ date1: date1ISOString, date2: date2ISOString });

            const res = await axios.get('https://time-tracker-api-3ixy.onrender.com/tasks/', {
                params: {
                    userId: user,
                    date1: date1ISOString,
                    date2: date2ISOString
                }
            });
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching default tasks:', error);
        }
    }, [user]);

    useEffect(() => {
        fetchDefault();
    }, [fetchDefault]);

    return (
        <>
            <DeleteDialog open={dialogState.openDelete} handleClose={handleClose} />
            <CreateDialog openNew={dialogState.openNew} handleNew={handleNew} user={user} />
            <div className="flex flex-col items-center min-h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-md min-w-[400px] md:min-w-[750px] mt-10 mx-auto">
                    <FilterBar handleSearch={handleSearch} />
                    <TaskTable
                        key={parentPage}  // This will reset the TaskTable component
                        tasks={tasks}
                        handleDelete={handleDelete}
                        handleCreate={handleCreate}
                        parentPage={parentPage} 
                        className="w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default TimeTracker;
