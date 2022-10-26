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
        link: "https://thanhnien.vn/ve-lang-say-mui-thuoc-lao-post1509533.html",
        title: "Về làng say mùi thuốc lào",
        thumbnail: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
        time: "2022-10-22T14:13:59+0700",
        summary: "Người xưa có câu: “Nhớ ai như nhớ thuốc lào/ Đã chôn điếu xuống lại đào điếu lên”.Nhưng chẳng cần hút, chỉ cần về làng Bái Khê (xã Liêm An, H.Vĩnh Bảo, Hải Phòng), chúng ta cũng sẽ bị say bởi mùi thuốc lào.",
        category: "Đời sống",
        sub_category: "",
        full_article: "Người xưa có câu: “Nhớ ai như nhớ thuốc lào/Đã chôn điếu xuống lại đào điếu lên”. Nhưng chẳng cần hút, chỉ cần về làng Bái Khê (xã Liêm An, H.Vĩnh Bảo, Hải Phòng), chúng ta cũng sẽ bị say bởi mùi thuốc lào.   Làng Bái Khê nói riêng và xã Liêm An nói chung được xem là vựa sản xuất thuốc lào của đất Vĩnh Bảo. Người dân ở Bái Khê tận dụng mọi con đường, ngõ ngách, bờ ruộng ở trong làng để phơi thuốc lào. Hàng nghìn giàn, mẹt phơi hình tròn, hình vuông hiện diện khắp nơi. Cuộc mưu sinh của người dân bắt đầu từ sáng sớm đến tối mịt với việc chở giàn phơi, đi rải giàn và đảo thuốc cho khô đều…  Trong hơi nóng của ngày đầu thu, đi khắp các con đường ở đây, chúng tôi cảm nhận thấy mùi thuốc lào sực lên tận mũi dù đã đeo khẩu trang. Nghề trồng, phơi và chế biến thuốc lào tuy vất vả, nhưng bao năm nay đã trở thành công việc cho thu nhập chính với người dân Bái Khê và các làng lân cận.      Sáng sớm những mẹt, giàn thuốc lào chất cao đã được chở trên xe cải tiến đi phơi    Giàn thuốc lào được chất lên xe    Ông Bảng ( 62 tuổi) bê lần lượt từng giàn thuốc lào đi phơi   \n       Trong chốc lát thuốc lào đã xuất hiện khắp đường làng ngõ xóm    Đi giữa con đường ngập giàn phơi ta có thể ngửi rõ mùi thuốc   Quảng cáo      Tận dụng cả vệ đường bên ruộng lúa để phơi thuốc"
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
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ color: 'text.disabled', display: 'block' }}
                            >
                                {time}
                            </Typography>

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
