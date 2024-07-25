import React from "react";
import { Carousel, CarouselProps } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Box } from "@mui/material";
import "./styles.css";
import Image from 'next/image'

const Gallery: React.FC<{ title: string; photos: any[] }> = ({
  title,
  photos,
}) => {
  const carouselProps = {
    showArrows: true,
    interval: 1500,
    axis: 'horizontal' as CarouselProps['axis'],
    transitionTime: 1000,
    showStatus: false,
    infiniteLoop: true,
    centerMode: true,
    dynamicHeight: true,
    className: 'gallery-carousel',
    selectedItem: 1,
    useKeyboardArrows: true,
    autoPlay: true,
    showThumbs: false
  }

  if (!photos.length) return null

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Typography variant="h6" component="h6" gutterBottom>
        {`${title}`}
      </Typography>
      <Box sx={{ display: { xs: 'block', md: 'none' }}}>
        <Carousel
          {...carouselProps}
          swipeable
        >
          {photos.map((photo, index) => (
            <div key={index}>
              <Image
                src={photo.url}
                alt={photo.title}
                width={100}
                height={150}
              />
            </div>
          ))}
        </Carousel>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }}}>
        <Carousel
          {...carouselProps}
          centerSlidePercentage={22}
        >
          {photos.map((photo, index) => (
            <div key={index}>
              <Image
                src={photo.url}
                alt={photo.title}
                width={200}
                height={300}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Gallery;
