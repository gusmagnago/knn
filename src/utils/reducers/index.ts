import { createSlice } from '@reduxjs/toolkit';
import { Shipments, State } from '../types';
import { RootState } from '../store';
import { fetchShipmentsData } from '../api/fetchShipmentsData';
import { updateShipmentData } from '../api/updateShipmentData';


const initialState: State = {
    shipments: [],
    loading: false,
    error: null,
};

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
            }).addCase(updateShipmentData.pending, (state: State) => {
                state.loading = true;
                state.error = null;
            }).addCase(updateShipmentData.fulfilled, (state: State, action) => {
                state.loading = false;
                const updatedShipment = action.payload as Shipments;
                const updatedIndex = state.shipments.findIndex(
                    (shipment) => shipment.trackingNo === updatedShipment.trackingNo
                );

                if (updatedIndex !== -1) {
                    state.shipments[updatedIndex] = updatedShipment;
                }
                state.shipments.push(updatedShipment);
            }).addCase(updateShipmentData.rejected, (state: State, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to upload shipments data';
            })
    },
});

export default dataSlice.reducer;
export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectLoading = (state: RootState) => state.shipments.loading;
export const selectError = (state: RootState) => state.shipments.error;
