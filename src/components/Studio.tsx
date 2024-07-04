import React from 'react';
import Gallery from './Gallery';


interface Props {
    images:  {
        url: string;
        title: string;
      }[]
}

const Studio = ({ images }: Props) => {

    return <Gallery title="Studio" photos={images}></Gallery>;
};

export default Studio;
