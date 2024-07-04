import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box } from '@mui/material';
import { RootState } from '../redux/rootReducer';

const BestPicturesCarousel: React.FC = () => {
    // const bestPictures = useSelector((state: RootState) => state.photos.bestPictures);
return null
    // return (
    //     <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
    //         {[].map((picture, index) => (
    //             <Box key={index} sx={{ position: 'relative' }}>
    //                 <img src={picture.url} alt={picture.title} style={{ maxHeight: '500px', objectFit: 'cover' }} />
    //                 <Typography
    //                     variant="h6"
    //                     sx={{
    //                         position: 'absolute',
    //                         bottom: 0,
    //                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //                         color: 'white',
    //                         width: '100%',
    //                         textAlign: 'center',
    //                         padding: '10px',
    //                     }}
    //                 >
    //                     {picture.title}
    //                 </Typography>
    //             </Box>
    //         ))}
    //     </Carousel>
    // );
};

export default BestPicturesCarousel;
