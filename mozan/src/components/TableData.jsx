import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

// Stying MUI Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1293ee',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





export default function TableData({ handleRefresh }) {

    const [studentData, setStudentData] = React.useState([]);
    // Fetch Data from Backend
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8097/api/v1/student/getall");
            const result = response.data;
            result.sort((a, b) => a.studentName.localeCompare(b.studentName)); //Sort the object in ascending order of name
            setStudentData(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [handleRefresh]); // Update component on every change in the form submit




    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Class</StyledTableCell>
                        <StyledTableCell align="right">Division</StyledTableCell>
                        <StyledTableCell align="right">DOB</StyledTableCell>
                        <StyledTableCell align="right">Gender</StyledTableCell>
                        <StyledTableCell align="right">R-ID</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Mapping values from Object to Table */}
                    
                    {studentData.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.studentName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.studentClass}</StyledTableCell>
                            <StyledTableCell align="right">{row.studentDiv}</StyledTableCell>
                            <StyledTableCell align="right">{row.studentDOB}</StyledTableCell>
                            <StyledTableCell align="right">{row.studentGender}</StyledTableCell>
                            <StyledTableCell align="right">{row._id}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
