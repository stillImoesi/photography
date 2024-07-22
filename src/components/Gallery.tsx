import React from "react";
import Carousel from "./Carousel";

interface Props {
    images:  {
        url: string;
        title: string;
      }[]
}

const Location = ({ images }: Props) => {
  return images.length ? <Carousel title="" photos={images} /> : null;
};

export default Location;
