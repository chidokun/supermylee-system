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


const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

NewsCard.propTypes = {
    news: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default function NewsCard({ news }) {


    const { thumbnail, title, summary, publish_time, link } = news;
    const linkTo = link;
    // const latestNews = index === 0;
    const latestNews = false;

    // const largerNews = index === 1 || index === 2;
    const largerNews = false;



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
                                    {publish_time}
                                </Typography>
                                {/* <img src='/static/images/thanhnien.svg' width={70} height={35} objectFit='contain' /> */}
                                {link.includes('tuoitre') && <img src='/static/images/tuoitre-online-logo.png' width={70} height={35} />}
                                {link.includes('thanhnien') && <img src='/static/images/thanhnien.svg' width={70} height={35} />}


                            </Box>

                            <TitleStyle
                                to={linkTo}
                                href={linkTo}
                                color="inherit"
                                variant="h6"

                                // component={RouterLink}
                                sx={{
                                    ...(latestNews && { typography: 'h6', height: 100 }),
                                    ...((latestNews || largerNews) && {
                                        color: 'common.white'
                                    }),
                                    height: 75
                                }}
                            >
                                {title}
                            </TitleStyle>
                            <Box height={60}>
                                <Typography variant="body2" color="textSecondary" >
                                    {summary.slice(0, 150).concat("...")}
                                </Typography>
                            </Box>


                        </CardContent>
                    </LinkNews>

                </Card>
            </motion.div>


        </Grid>
    );
}
