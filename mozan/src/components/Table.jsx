import * as React from 'react';
// Material Ui Imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import Typography from '@mui/material/Typography';

import TableData from './TableData';

export default function ({ handleRefresh }) {
    return (
        <div>
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
                <Typography component="h1" variant="h4" sx={{mb:2}}>
                    Student Data
                </Typography>
                <TableData handleRefresh={handleRefresh} />
            </Box>

        </div>
    )
}
