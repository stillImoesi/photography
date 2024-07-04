import { createSlice, PayloadAction, Dispatch, UnknownAction } from '@reduxjs/toolkit';

interface PhotoState {
    bestPictures: any[];
    headshots: any[];
    events: any[];
}

const initialState: PhotoState = {
    bestPictures: [],
    headshots: [],
    events: []
};

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setBestPictures(state, action: PayloadAction<any[]>) {
            state.bestPictures = action.payload;
        },
        setHeadshots(state, action: PayloadAction<any[]>) {
            state.headshots = action.payload;
        },
        setEvents(state, action: PayloadAction<any[]>) {
            state.events = action.payload;
        }
    }
});

export const { setBestPictures, setHeadshots, setEvents } = photoSlice.actions;

export const generateInspiration = (description: string, image: File | null): any => {

};

export default photoSlice.reducer;
