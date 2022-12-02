import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from "framer-motion";
// import { Link as RouterLink } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import MessageIcon from '@mui/icons-material/Message';
// material
import {
    Box,
    Link,
    Card,
    Grid,
    Avatar,
    Typography,
    CardContent
} from '@material-ui/core';
import { styled } from '@mui/material/styles';
// routes
// utils
//

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
});

const LinkNews = styled(Link)({
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    left: theme.spacing(3),
    bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

NewsCard.propTypes = {
    // post: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default function NewsCard({ post, index }) {

    const POST = {
        id: "post - 1509533.html",
        link: "https://vnexpress.net/iphone-14-pro-max-ban-chay-nhat-toan-cau-4542506.html",
        title: "iPhone 14 Pro Max bán chạy nhất toàn cầu",
        thumbnail: "https://i1-sohoa.vnecdn.net/2022/11/30/DSF6630-5044-1669808923.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=dhgX9vLkBwXmnZBHtkk4Ow",
        time: "2022-10-22T14:13:59+0700",
        summary: "Điện thoại cao cấp nhất của Apple có doanh số đầu bảng tháng 10 trong bối cảnh thị trường chung ảm đạm.",
        category: "Công nghệ",
        sub_category: "",
        full_article: ""
    }
    const { thumbnail, title, summary, comment, share, view, author, time, link } = POST;
    const linkTo = link;
    // const latestNews = index === 0;
    const latestNews = false;

    // const largerNews = index === 1 || index === 2;
    const largerNews = false;


    const POST_INFO = [
        { number: comment, icon: MessageIcon },
        { number: view, icon: VisibilityIcon },
        { number: share, icon: ShareIcon }
    ];

    return (
        <Grid
            item
            xs={12}
            sm={latestNews ? 12 : 6}
            md={latestNews ? 6 : 3}
        >
            <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Card sx={{ position: 'relative' }}>
                    <LinkNews href={linkTo} style={{ textDecoration: 'none' }}>
                        <CardMediaStyle
                            sx={{
                                ...((latestNews || largerNews) && {
                                    pt: 'calc(100% * 4 / 3)',
                                    '&:after': {
                                        top: 0,
                                        content: "''",
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                                    }
                                }),
                                ...(latestNews && {
                                    pt: {
                                        xs: 'calc(100% * 4 / 3)',
                                        sm: 'calc(100% * 3 / 4.66)'
                                    }
                                })
                            }}
                        >
                            <Box
                                component="span"
                                sx={{

                                    mask: `url(${thumbnail}) no-repeat center / contain`,
                                    WebkitMask: `url(${thumbnail}) no-repeat center / contain`,
                                    bgcolor: `paper.main`,

                                    color: 'paper',
                                    width: 80,
                                    height: 36,
                                    zIndex: 9,
                                    bottom: -15,
                                    position: 'absolute',
                                    ...((latestNews || largerNews) && { display: 'none' })
                                }}
                            />
                            {/* <SvgIconStyle
                        color="paper"
                        src="/static/icons/shape-avatar.svg"
                        sx={{
                            width: 80,
                            height: 36,
                            zIndex: 9,
                            bottom: -15,
                            position: 'absolute',
                            ...((latestNews || largerNews) && { display: 'none' })
                        }}
                    /> */}

                            <AvatarStyle
                                // alt={author.name}
                                src='/static/images/avatar.jpg'
                                sx={{
                                    ...((latestNews || largerNews) && {
                                        zIndex: 9,
                                        top: 24,
                                        left: 24,
                                        width: 40,
                                        height: 40
                                    })
                                }}
                            />

                            <CoverImgStyle alt={title} src={thumbnail} />
                        </CardMediaStyle>

                        <CardContent
                            sx={{
                                pt: 4,
                                ...((latestNews || largerNews) && {
                                    bottom: 0,
                                    width: '100%',
                                    position: 'absolute'
                                })
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'text.disabled', display: 'block' }}
                                >
                                    {time}
                                </Typography>
                                {/* <img src='/static/images/thanhnien.svg' width={70} height={35} objectFit='contain' /> */}
                                <img src='/static/images/tuoitre-online-logo.png' width={70} height={35} objectFit='contain' />
                            </Box>

                            <TitleStyle
                                to={linkTo}
                                href={linkTo}
                                color="inherit"
                                variant="h6"
                                // component={RouterLink}
                                sx={{
                                    ...(latestNews && { typography: 'h5', height: 60 }),
                                    ...((latestNews || largerNews) && {
                                        color: 'common.white'
                                    })
                                }}
                            >
                                {title}
                            </TitleStyle>
                            <Typography variant="body2" color="textSecondary" >
                                {summary}
                            </Typography>

                        </CardContent>
                    </LinkNews>

                </Card>
            </motion.div>


        </Grid>
    );
}
