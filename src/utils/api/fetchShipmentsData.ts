import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { shipments } from './shipments';

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
            if (axiosError.response) {
                try {
                    return shipments;
                } catch (error) {
                    return axiosError.message;
                }
            }
            return axiosError.message;
        }
    }
);
