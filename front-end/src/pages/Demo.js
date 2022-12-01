import * as React from 'react';
import { Button, Container, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

export default function Demo() {

    return (
        <Container sx={{
            marginTop: "70px"
        }}>
            {/* <Typography variant="h4" component="h2" align='center' >
                Demo
            </Typography> */}
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-title">Tiêu đề</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-title"
                    label="Tiêu đề"
                />

            </FormControl>
            <FormControl fullWidth mu sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-body">Nội dung</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-body"
                    multiline
                    label="Nội dung"
                    rows={6}
                />

            </FormControl>
            <FormControl>
                <Button variant="contained" size='large' endIcon={<SendIcon />} sx={{
                    margin: "8px",
                    float: "right"
                }}>
                    Send
                </Button>

            </FormControl>
        </Container>
    );
}
