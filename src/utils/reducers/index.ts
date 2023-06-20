import { createSlice, createSelector } from '@reduxjs/toolkit';
import { Shipments, State } from '../types';
import { RootState } from '../store';
import { fetchShipmentsData } from '../api/fetchShipmentsData';
import { updateShipmentData } from '../api/updateShipmentData';

const initialState: State = {
    shipments: [],
    updatedShipments: [],
    loading: false,
    error: null,
};

const dataSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        deleteShipment: (state: State, action) => {
            const trackingId = action.payload;
            state.shipments = state.shipments.filter((shipment) => shipment.trackingNo !== trackingId)
        }
    },
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
            })
            .addCase(updateShipmentData.pending, (state: State) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateShipmentData.fulfilled, (state: State, action) => {
                state.loading = false;
                const updatedShipment = action.payload as Shipments;
                const updatedIndex = state.shipments.findIndex(
                    (shipment) => shipment.trackingNo === updatedShipment.trackingNo
                );

                if (updatedIndex !== -1) {
                    state.shipments[updatedIndex] = updatedShipment;
                }
                state.updatedShipments.push(updatedShipment);
            })
            .addCase(updateShipmentData.rejected, (state: State, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to upload shipments data';
            });
    },
});

export const { deleteShipment } = dataSlice.actions;

export default dataSlice.reducer;

export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectUpdatedShipments = (state: RootState) =>
    state.shipments.updatedShipments;
export const selectLoading = (state: RootState) => state.shipments.loading;
export const selectError = (state: RootState) => state.shipments.error;

export const updatedShipmentList = createSelector(
    selectShipments,
    selectUpdatedShipments,
    (shipments, updatedShipments) =>
        shipments.map((shipment) => {
            const matchingUpdatedShipment = updatedShipments.find(
                (updatedShipment) => updatedShipment.trackingNo === shipment.trackingNo
            );

            if (matchingUpdatedShipment) {
                return matchingUpdatedShipment;
            }

            return shipment;
        })
);
