import { MouseEvent } from "react";
import { GridEnrichedColDef } from '@mui/x-data-grid';

export type TCustomFieldsForColDef = { 
    field: string, 
    headerName?: string,
    headerAlign?: string,
    headerColor?: string,
    type?: string,
    minWidth: number,
    flex?: number,
    align?: string,
    hideable?: boolean,
    editable?: boolean,
    sortable?: boolean,
    renderCell?: ({ row }: any) => any
};

export type TDataPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface IGridCellProps {
    newKey?: string,
    draggingColumn: number | null,
    handleMouseDown: (columnIndex: number, e: MouseEvent<Element, globalThis.MouseEvent>) => void,
    loading: boolean;
    data: TDataPost[];
    columnDef: TCustomFieldsForColDef[];
    rowCount: number;
    disableLoadingLastRow?: boolean
}

export type TSizeCustomDataGrid = {
    width: number,
    height: number,
}

export type TWidths = Record<number, number>;

export type TDragState = {
    draggingColumn: number | null,
    dragStartX: number,
    dragStartWidths: TWidths,
}

export const MIN_COLUMN_WIDTH = 60;

export const columns: Array<GridEnrichedColDef & TCustomFieldsForColDef> = [
    {
        field: "id",
        headerName: "ID",
        headerColor: "#fafafa",
        headerAlign: "center",
        type: "number",
        minWidth: 170,
        align: "center",
        hideable: false,
    },
    {
        field: "title",
        headerName: "Заголовок",
        headerColor: "#fafafa",
        headerAlign: "center",
        align: "center",
        type: "string",
        minWidth: 370,
        flex: 1,
        hideable: true,
        renderCell: ({row}: any) => row.title.slice(1, 40),
    },
    {
        field: "body",
        headerName: "Пост",
        headerColor: "#fafafa",
        headerAlign: "center",
        align: "center",
        type: "string",
        minWidth: 370,
        flex: 1,
        hideable: false,
        renderCell: ({row}: any) => row.body.slice(1, 40),
    }
];