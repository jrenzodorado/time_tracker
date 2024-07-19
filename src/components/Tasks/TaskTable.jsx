import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


const columns = [
    { id: 'date', label: 'Date Logged', minWidth: 100 },
    { id: 'code', label: 'Task', minWidth: 200 },

];
const TaskTable = ({ tasks, handleDelete, handleCreate }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    return (
        <div className='bg-white p-6 rounded-lg shadow-md min-w-[400px] md:min-w-[600px] mt-10  text-sm'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{ backgroundColor: 'rgb(249 115 22)', color: 'white' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                    sx={{ backgroundColor: 'rgb(249 115 22)', color: 'white', textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => { handleCreate() }}
                                >
                                    <AddBoxOutlinedIcon />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tasks
                            ).map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '12px' }}>
                                        {row.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '12px' }}>
                                        {row.task}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center', cursor: 'pointer',
                                            '&:hover': {
                                                color: 'rgb(249 115 22)',
                                            },
                                        }}
                                        onClick={() => { handleDelete(row._id) }}
                                    >
                                        <DeleteOutlinedIcon />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>


    )
}

export default TaskTable