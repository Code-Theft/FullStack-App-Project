import * as React from 'react';
// Material UI Imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GroupIcon from '@mui/icons-material/Group';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


import Table from './Table';

const classValues = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const DivValues = ['A', 'B', 'C'];


export default function Page1() {

    const [clas, setClas] = React.useState('');
    const [div, setDiv] = React.useState('');
    const [name, setName] = React.useState('');
    const [dob, setDob] = React.useState(null);
    const [gender, getGender] = React.useState('');
    const [nameError, setNameError] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [isValid, setisValid] = React.useState(false);
    const [refreshTable, setRefreshTable] = React.useState(false);


    const handleClassChange = (event) => {
        setClas(event.target.value);
    };

    const handleDivChange = (event) => {
        setDiv(event.target.value);
    };

    const handleNameChange = (event) => {

        const inputValue = event.target.value;
        const isValid = /^[A-Za-z\s]+$/.test(inputValue);
        setName(inputValue);
        setNameError(!isValid);
    };

    const handleDateChange = (selectedDate) => {
        // Update dob state with selected date
        setDob(selectedDate)
        const formattedDate = selectedDate ? selectedDate.format('DD-MM-YYYY') : '';
        console.log("Formatted DOB (Day, Month, Year):", formattedDate);

    };

    const handleGenderChange = (event) => {
        getGender(event.target.value);
    };

    const handleTableRefresh = () => {
        setRefreshTable(!refreshTable);
    };

    const handleSubmission = (event) => {
        event.preventDefault(); // Prevent form submission through HTTP request

        let errorMessage = '';

        if (!name || !clas || !div || !dob || !gender || nameError) {
            setisValid(false);
            errorMessage = 'Please complete all fields\n';
        }

        if (errorMessage) {
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
            return;
        }

        // API Call to Push Data to String Boot

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "studentName": name,
            "studentClass": clas,
            "studentDiv": div,
            "studentDOB": dob ? dob.format("DD-MM-YYYY") : " ",
            "studentGender": gender
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8097/api/v1/student/save", requestOptions)
            .then(response => response.text(),


            )
            .then(result => {
                console.log(result);
                setisValid(true);
                setSnackbarMessage('Form submitted successfully!');
                setSnackbarOpen(true);
                // Refresh the table after successful form submission
                handleTableRefresh();
            })
            .catch(error => console.log('error', error));
    };

    return (
        <div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                 {/* =======================================Left Side Sectuion cotaining the Form ======================== */}
                <Grid item xs={12} sm={6} component={Paper} square >

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',


                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1293ee' }}>
                            <GroupIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Student Registration
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 4, border: '1px solid #aaa', p: 4, borderRadius: 5, boxShadow: '0px 25px 20px -20px rgba(0, 0, 0, 0.45)' }} >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="outlined-error-helper-text"
                                label="Name"
                                name="Name"
                                autoFocus
                                value={name}
                                error={nameError}
                                helperText={nameError ? "Please enter letters and spaces only." : ""}
                                onChange={handleNameChange}

                            />

                            <FormControl sx={{ mt: 1, minWidth: 120, display: 'block', }}>
                                <InputLabel id="demo-simple-select-helper-label">Class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    fullWidth={true}
                                    value={clas}
                                    label="Class"

                                    onChange={handleClassChange}
                                >

                                    {classValues.map((item => (
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    )))}

                                </Select>
                                {/* <FormHelperText>With label + helper text</FormHelperText> */}
                            </FormControl>


                            <FormControl sx={{ mt: 1, minWidth: 120, display: 'block' }}>
                                <InputLabel id="demo-simple-select-helper-label">Division</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    fullWidth={true}
                                    value={div}
                                    label="Class"

                                    onChange={handleDivChange}
                                >

                                    {DivValues.map((item => (
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    )))}

                                </Select>

                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker

                                        label="Date of Birth"
                                        value={dob}
                                        onChange={handleDateChange}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <FormControl sx={{ display: 'block', m: 2 }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={gender} // Set the selected value to the gender state
                                    onChange={handleGenderChange}
                                >
                                    <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />


                                </RadioGroup>
                            </FormControl>


                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Button
                                    type="submit"
                                    onClick={handleSubmission}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: '#1293ee' }}
                                >
                                    Submit
                                </Button>
                            </Box>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={4000}
                                onClose={() => setSnackbarOpen(false)}
                            >
                                <Alert
                                    onClose={() => setSnackbarOpen(false)}
                                    severity={isValid ? 'success' : 'error'}
                                    sx={{ width: '100%' }}
                                >
                                    {snackbarMessage}
                                </Alert>
                            </Snackbar>

                        </Box>
                    </Box>
                </Grid>

                {/* =======================================Right Side Sectuion cotaining the Table ======================== */}
                <Grid item xs={12} sm={6} md={6} component={Paper} square>
                    {/* <Table handleRefresh={handleTableRefresh} setRefreshTable={setRefreshTable}/> */}
                    <Table handleRefresh={handleTableRefresh} />
                </Grid>
            </Grid>
        </div>
    );
}