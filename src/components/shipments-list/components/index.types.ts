import { Shipments } from '../../../utils/types';

export interface ColumnProps {
    name: string;
    heading: string;
}

export interface ShipmentsTableProps {
    column: ColumnProps[];
    data: Shipments[];
}

export interface ShipmentsTableRowProps {
    item?: Shipments;
    column: ColumnProps[];
    parent: 'thead' | 'tbody';
    className?: string;
}

export interface PaginationProps {
    active: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export interface ActionButtonProps {
    isDelete?: boolean;
    shipId: string | undefined;
}
