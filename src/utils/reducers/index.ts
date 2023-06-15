import { createSlice } from '@reduxjs/toolkit';
import { State } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios, { AxiosError } from 'axios';

const initialState: State = {
    shipments: [],
    loading: false,
    error: null,
};

export const fetchShipmentsData = createAsyncThunk(
    'shipments/fetchData',
    async () => {
        try {
            const response = await axios.get(
                'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0'
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (
                axiosError.response
            ) {
                try {
                    const localData = await axios.get('/shipments.json');
                    return localData.data;
                } catch (error) {
                    return axiosError.message;
                }
            }
            return axiosError.message;
        }
    }
);

const dataSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipmentsData.pending, (state: State) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShipmentsData.fulfilled, (state: State, action) => {
                state.shipments = action.payload;
                state.loading = false;
            })
            .addCase(fetchShipmentsData.rejected, (state: State, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch shipments data';
            });
    },
});

export default dataSlice.reducer;
export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectLoading = (state: RootState) => state.shipments.loading;
export const selectError = (state: RootState) => state.shipments.error;
