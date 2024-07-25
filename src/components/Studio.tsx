import React from 'react';
import Gallery from './Carousel';
import { LocalImages } from 'src/utils/type';
interface Props {
    images:  LocalImages[];
}

const Studio = ({ images }: Props) => {

    return <Gallery title="Studio" photos={images}></Gallery>;
};

export default Studio;
