import { AxiosError } from "axios";

export enum ShipmentStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In Transit',
    DELIVERED = 'Delivered',
}

export interface Shipments {
    orderNo: string;
    date: string;
    customer: string;
    trackingNo: string;
    status: ShipmentStatus;
    consignee: string;
}

export interface State {
    shipments: Shipments[];
    loading: boolean;
    error: null | string | undefined | void | AxiosError;
}
