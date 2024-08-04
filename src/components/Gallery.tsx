import React from "react";
import Carousel from "./Carousel";
import { LocalImages } from "src/utils/type";
import { Box, Typography } from "@mui/material";

interface Props {
  images: LocalImages[];
}

const Location = ({ images }: Props) =>
  images.length ? (
    <Box marginTop={"20px"}>
      <Typography variant="h4" component="h2" gutterBottom>
        Gallery
      </Typography>
      <Carousel title="" photos={images} />
    </Box>
  ) : null;

export default Location;
