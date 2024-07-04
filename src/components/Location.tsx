import React from "react";
import Gallery from "./Gallery";

interface Props {
    images:  {
        url: string;
        title: string;
      }[]
}

const Location = ({ images }: Props) => {
  return images.length && <Gallery title="On location" photos={images} />;
};

export default Location;
