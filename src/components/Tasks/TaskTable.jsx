import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const headerCellStyles = {
    backgroundColor: 'rgb(249 115 22)',
    color: 'white',
};

const rowCellStyles = {
    fontSize: '12px',
};

const actionCellStyles = {
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        color: 'rgb(249 115 22)',
    },
};

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={headerCellStyles}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                sx={{ ...headerCellStyles, textAlign: 'center', cursor: 'pointer' }}
                                onClick={handleCreate}
                            >
                                <AddBoxOutlinedIcon />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tasks).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row" sx={rowCellStyles}>
                                    {row.createdAt.split('T')[0]}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={rowCellStyles}>
                                    {row.task}
                                </TableCell>
                                <TableCell
                                    sx={actionCellStyles}
                                    onClick={() => handleDelete(row._id)}
                                >
                                    <DeleteOutlinedIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={columns.length + 1} />
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
    );
};

export default TaskTable;
