import { FC } from 'react';
import { GridCellProps } from "react-virtualized";
import { IGridCellProps, TDataPost } from './parametersDataGrid';


type ColumnKey = keyof TDataPost;   // type ColumnKey = "id" | "title" | "body";

const GridCell: FC<IGridCellProps & GridCellProps> = (props) => {
    const {
        newKey, 
        columnIndex,
        rowIndex,
        style,
        loading: isLoading,
        data,
        columnDef,
        rowCount,
        disableLoadingLastRow 
    } = props;
    const keyOfColumn = columnDef?.[columnIndex]?.field as ColumnKey;
    const currentRow = rowIndex === 0 ? {} as TDataPost : data[rowIndex - 1] || '';
    const person = currentRow[keyOfColumn];

    return (
      <div 
        key={newKey} 
        style={{
          ...style,
          padding: '8px 12px',
          borderBottom: '1px solid #eee',
          backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {person || `Row ${rowIndex}`}
      </div>
    );
};

export default GridCell;
