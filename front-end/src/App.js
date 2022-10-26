import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsCard from './components/NewsCard';
import { Card, Grid, Skeleton } from '@mui/material';
import ResponsiveAppBar from './components/AppBar';



export default function App() {
  const [news, setNews] = React.useState(Array.from({ length: 20 }));
  const onScroll = () => {
    setNews(news.concat(Array.from({ length: 20 })));
  };
  const fetchMoreData = () => {
    if (news.length > 40) return;
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setNews(news.concat(Array.from({ length: 20 })));
    }, 10000);
  };
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
      <ResponsiveAppBar />

      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreData}
        hasMore={true}

        loader={SkeletonLoad}
        style={styleInfiniteScroll}
      >
        <Grid container spacing={3}>
          {news.map((i, index) => (
            <NewsCard key={index} index={index}>

            </NewsCard>

          ))}
        </Grid>

      </InfiniteScroll>

    </Box>
  );
}
