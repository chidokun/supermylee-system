import * as React from 'react';
import { Box, Button, Container, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

export default function Demo() {

    return (
        <Container sx={{
            marginTop: "90px"
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
                    rows={9}
                />

            </FormControl>
            <Box sx={{
                display: "flex",
                justifyContent: 'center'

            }}>
                <Button variant="contained" size='large' style={{ background: 'linear-gradient(to right bottom, #0061ff, #60efff)' }} endIcon={<SendIcon />} sx={{
                    margin: "8px",
                }}>
                    Send
                </Button>

            </Box>
        </Container>
    );
}
