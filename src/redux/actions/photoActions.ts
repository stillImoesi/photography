import { Dispatch } from 'redux';

export const setBestPictures = (pictures: any[]) => ({
    type: 'SET_BEST_PICTURES',
    payload: pictures
});

export const setHeadshots = (headshots: any[]) => ({
    type: 'SET_HEADSHOTS',
    payload: headshots
});

export const setEvents = (events: any[]) => ({
    type: 'SET_EVENTS',
    payload: events
});

export const generateInspiration = (description: string, image: File | null) => async (dispatch: Dispatch) => {
    // Implement logic to generate inspiration (e.g., call to OpenAI API)
};
