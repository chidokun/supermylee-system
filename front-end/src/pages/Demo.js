import * as React from 'react';
import { Box, Button, Container, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Heatmap } from '@ant-design/charts';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Column } from '@ant-design/plots';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseURL } from '../config';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function Demo() {
    const [data, setData] = React.useState([]);
    const titleRef = React.useRef();
    const summaryRef = React.useRef();

    const handleClickOpen = async () => {
        await getPredict();
    };


    async function getPredict() {
        try {
            const articles = {
                articles: [{
                    title: titleRef.current.value,
                    summary: summaryRef.current.value
                }]
            };

            const response = await axios.get(`${baseURL}/predict`, articles);
            console.log(response.data.data[0].result);
            setData(response.data.data[0].result.sort(function (a, b) { return b.score - a.score }));

        } catch (error) {
            console.error(error);
        }
    }


    const config = {
        // width: 1600,
        // height: 500,
        autoFit: false,
        data,
        xField: 'category',
        yField: 'score',
        colorField: 'score',
        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'category': {
                type: 'cat',
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: true,
            },
        },
    };

    return (
        <Container sx={{
            marginTop: "75px"
        }}>
            <Typography variant="h4" component="h3" align='left' sx={{ padding: "8px" }} color="primary" >
                Demo
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-title">Tiêu đề</InputLabel>
                <OutlinedInput
                    inputRef={titleRef}
                    id="outlined-adornment-title"
                    label="Tiêu đề"

                />

            </FormControl>
            <FormControl fullWidth mu sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-body">Nội dung</InputLabel>
                <OutlinedInput
                    inputRef={summaryRef}
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
                }} onClick={handleClickOpen}>
                    Send
                </Button>

            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: 'center'

            }}>
                <Column {...config} />

            </Box>
        </Container>
    );
}
