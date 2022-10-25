import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
        thumbnail: "https://image.thanhnien.vn/1200x630/Uploaded/2022/lxwpcqjwp/2022_10_12/5-1608.jpg",
        time: "2022-10-22T14:13:59+0700",
        summary: "Người xưa có câu: “Nhớ ai như nhớ thuốc lào/ Đã chôn điếu xuống lại đào điếu lên”.Nhưng chẳng cần hút, chỉ cần về làng Bái Khê (xã Liêm An, H.Vĩnh Bảo, Hải Phòng), chúng ta cũng sẽ bị say bởi mùi thuốc lào.",
        category: "Đời sống",
        sub_category: "",
        full_article: "Người xưa có câu: “Nhớ ai như nhớ thuốc lào/Đã chôn điếu xuống lại đào điếu lên”. Nhưng chẳng cần hút, chỉ cần về làng Bái Khê (xã Liêm An, H.Vĩnh Bảo, Hải Phòng), chúng ta cũng sẽ bị say bởi mùi thuốc lào.   Làng Bái Khê nói riêng và xã Liêm An nói chung được xem là vựa sản xuất thuốc lào của đất Vĩnh Bảo. Người dân ở Bái Khê tận dụng mọi con đường, ngõ ngách, bờ ruộng ở trong làng để phơi thuốc lào. Hàng nghìn giàn, mẹt phơi hình tròn, hình vuông hiện diện khắp nơi. Cuộc mưu sinh của người dân bắt đầu từ sáng sớm đến tối mịt với việc chở giàn phơi, đi rải giàn và đảo thuốc cho khô đều…  Trong hơi nóng của ngày đầu thu, đi khắp các con đường ở đây, chúng tôi cảm nhận thấy mùi thuốc lào sực lên tận mũi dù đã đeo khẩu trang. Nghề trồng, phơi và chế biến thuốc lào tuy vất vả, nhưng bao năm nay đã trở thành công việc cho thu nhập chính với người dân Bái Khê và các làng lân cận.      Sáng sớm những mẹt, giàn thuốc lào chất cao đã được chở trên xe cải tiến đi phơi    Giàn thuốc lào được chất lên xe    Ông Bảng ( 62 tuổi) bê lần lượt từng giàn thuốc lào đi phơi   \n       Trong chốc lát thuốc lào đã xuất hiện khắp đường làng ngõ xóm    Đi giữa con đường ngập giàn phơi ta có thể ngửi rõ mùi thuốc   Quảng cáo      Tận dụng cả vệ đường bên ruộng lúa để phơi thuốc"
    }
    const { thumbnail, title, summary, comment, share, view, author, time, link } = POST;
    const linkTo = link;
    // const latestPostLarge = index === 0;
    const latestPostLarge = false;

    // const latestPost = index === 1 || index === 2;
    const latestPost = false;


    const POST_INFO = [
        { number: comment, icon: MessageIcon },
        { number: view, icon: VisibilityIcon },
        { number: share, icon: ShareIcon }
    ];

    return (
        <Grid
            item
            xs={12}
            sm={latestPostLarge ? 12 : 6}
            md={latestPostLarge ? 6 : 3}
        >
            <Card sx={{ position: 'relative' }}>
                <CardMediaStyle
                    sx={{
                        ...((latestPostLarge || latestPost) && {
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
                        ...(latestPostLarge && {
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
                            ...((latestPostLarge || latestPost) && { display: 'none' })
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
                            ...((latestPostLarge || latestPost) && { display: 'none' })
                        }}
                    /> */}
                    <AvatarStyle
                        // alt={author.name}
                        // src={author.avatarUrl}
                        sx={{
                            ...((latestPostLarge || latestPost) && {
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
                        ...((latestPostLarge || latestPost) && {
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
                        variant="subtitle2"
                        // component={RouterLink}
                        sx={{
                            ...(latestPostLarge && { typography: 'h5', height: 60 }),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {title}
                    </TitleStyle>
                    <Typography variant="body2" color="textSecondary">
                        {summary}
                    </Typography>

                </CardContent>
            </Card>
        </Grid>
    );
}
