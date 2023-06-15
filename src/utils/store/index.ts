import { useDispatch } from 'react-redux';
import dataReducer from '../reducers';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        shipments: dataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

