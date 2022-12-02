import * as React from 'react';
import { Box, Button, Container, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Heatmap } from '@ant-design/charts';

export default function Demo() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        width: 800,
        height: 500,
        autoFit: false,
        data,
        xField: 'Month of Year',
        yField: 'District',
        colorField: 'AQHI',
        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'Month of Year': {
                type: 'cat',
            },
        },
    };

    return (
        <Container sx={{
            marginTop: "75px"
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
                justifyContent: 'center',
                marginBottom: "10px"

            }}>
                <Button variant="contained" size='large' style={{ background: 'linear-gradient(to right bottom, #0061ff, #60efff)' }} endIcon={<SendIcon />} sx={{
                    margin: "8px",
                }}>
                    Send
                </Button>

            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: 'center'

            }}>
                <Heatmap {...config} />

            </Box>
        </Container>
    );
}
