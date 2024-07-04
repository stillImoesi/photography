import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Gallery from './Gallery';

const Event: React.FC = () => {
    const events = useSelector((state: RootState) => state.photos.events);
    return <Gallery title="EventPhotography" photos={events} />;
};

export default Event;