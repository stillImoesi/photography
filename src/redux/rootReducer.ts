import { combineReducers } from 'redux';
import photoReducer from './photoSlice';

const rootReducer = combineReducers({
    photos: photoReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
