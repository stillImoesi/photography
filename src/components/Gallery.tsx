import React from "react";
import Carousel from "./Carousel";
import { LocalImages } from "src/utils/type";

interface Props {
  images: LocalImages[];
}

const Location = ({ images }: Props) =>
  images.length ? <Carousel title="" photos={images} /> : null;

export default Location;
