import { createAsyncThunk } from '@reduxjs/toolkit';
import { Shipments } from '../types';
import { shipments } from './shipments';

import { AxiosError } from 'axios';

interface UpdateShipmentProps {
    shipIdFromEdit: string;
    foundShipment: Shipments;
}

export const updateShipmentData = createAsyncThunk(
    'shipments/updateShipment',
    async ({ shipIdFromEdit, foundShipment }: UpdateShipmentProps) => {
        try {
            const updated = shipments.find(
                (shipment) => shipment.trackingNo === shipIdFromEdit
            ) as Shipments;

            const updatedShipments: Shipments = {
                ...updated,
                customer: foundShipment.customer,
                consignee: foundShipment.consignee,
            };

            return updatedShipments;

        } catch (error) {
            const axiosError = error as AxiosError;
            return axiosError.message;
        }
    }
);
