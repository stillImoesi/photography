import { Box } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import backgroud01 from '../assets/background.jpg'

const BackgroundCarousel: React.FC = () => {
    const carouselPictures = [
        {
            url: backgroud01.src,
            title: 'lady01'
        }
    ];

    return (
        <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={1000}
            stopOnHover={false}
            swipeable={false}
            dynamicHeight={false}
        >
            {carouselPictures.map((picture, index) => (
                <Box key={index} sx={{ height: { xs: '100vh', md: '93vh' }, width:  { xs: '100%', md: '60%' }, float: 'right' }}>
                    <img src={picture.url} alt={picture.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </Box>
            ))}
        </Carousel>
    );
};

export default BackgroundCarousel;
