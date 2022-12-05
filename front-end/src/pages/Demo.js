import * as React from 'react';
import { Box, Button, Container, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Heatmap } from '@ant-design/charts';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

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
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const titleRef = React.useRef(null);
    const summaryRef = React.useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    async function getPredict() {
        try {
            const articles = {
                articles: [{
                    title: titleRef.current.value,
                    summary: summaryRef.current.value
                }]
            };

            // const response = await axios.post(`http://localhost:8101/api/predict`,articles);
            console.log(articles);
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        // asyncFetch();
        getPredict();
        setData([
            {
                "category": "Thời sự",
                "category_index": 1,
                "score": 0.12
            },
            {
                "category": "Văn hóa",
                "category_index": 2,
                "score": 0.01
            },
            {
                "category": "Sức khỏe",
                "category_index": 3,
                "score": 0.02
            },
            {
                "category": "Giải trí",
                "category_index": 4,
                "score": 0.01
            },
            {
                "category": "Tài chính kinh doanh",
                "category_index": 5,
                "score": 0.42
            },
            {
                "category": "Thế giới",
                "category_index": 6,
                "score": 0.11
            },
            {
                "category": "Giáo dục",
                "category_index": 7,
                "score": 0.35
            },
            {
                "category": "Pháp luật",
                "category_index": 8,
                "score": 0.21
            },
            {
                "category": "Kinh doanh",
                "category_index": 9,
                "score": 0.01
            },
            {
                "category": "Khoa học",
                "category_index": 10,
                "score": 0.11
            },
            {
                "category": "Đời sống",
                "category_index": 11,
                "score": 0.25
            },
            {
                "category": "Du lịch",
                "category_index": 12,
                "score": 0.99
            }
        ]);
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
        xField: 'category',
        yField: 'score',
        colorField: 'score',
        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'category': {
                type: 'cat',
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
                    ref={titleRef}
                    id="outlined-adornment-title"
                    label="Tiêu đề"

                />

            </FormControl>
            <FormControl fullWidth mu sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-body">Nội dung</InputLabel>
                <OutlinedInput
                    ref={summaryRef}
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


            </Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='lg'
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Result
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Heatmap {...config} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Container>
    );
}
