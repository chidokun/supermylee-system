import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Grid, Skeleton } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsCard from '../components/NewsCard';
import { baseURL } from "../config";



export default function Home() {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    async function getNews() {
        try {
            const response = await axios.get(`${baseURL}/news/${page}`);
            setNews(news.concat(response.data))
            console.log(response.data)
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMoreData = () => {
        setTimeout(async () => {
            await getNews()
        }, 2000)

    };

    useEffect(() => {
        getNews();
    }, []);
    const styleInfiniteScroll = {
        overflow: "hidden",
        paddingTop: '75px'
    };

    const SkeletonLoad = (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
                {[...Array(4)].map((_, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            sx={{ height: 462, width: 355, borderRadius: 2 }}
                        />
                        <Box sx={{ display: 'flex', mt: 3 }}>
                            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
                            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
    return (
        <Box>

            <InfiniteScroll
                dataLength={news?.length}
                next={fetchMoreData}
                hasMore={true}

                loader={SkeletonLoad}
                style={styleInfiniteScroll}
            >
                <Grid container spacing={3}>
                    {news?.map((news, index) => (
                        <NewsCard key={index} index={index} news={news}>

                        </NewsCard>

                    ))}
                </Grid>

            </InfiniteScroll>

        </Box>
    );
}
