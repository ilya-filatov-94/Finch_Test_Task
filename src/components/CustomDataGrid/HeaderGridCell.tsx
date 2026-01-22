import { FC } from 'react';
import { GridCellProps } from "react-virtualized";
import { IGridCellProps } from './parametersDataGrid';

const HeaderGridCell: FC<GridCellProps & IGridCellProps> = (props) => {
  const { newKey, style, columnDef, columnIndex, draggingColumn, handleMouseDown } = props;
  const isDragging = draggingColumn === columnIndex;
    
  return (
        <div 
          key={newKey} 
          style={{ 
            ...style, 
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            flex: 1, 
            paddingRight: '24px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {columnDef?.[columnIndex]?.headerName || '-'}
          </div>
          
          {/* Handle для изменения ширины */}
          <div
            style={{
              position: 'absolute',
              right: '4px',
              top: '0',
              bottom: '0',
              width: '16px',
              cursor: 'col-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDragging ? '#e0e0e0' : 'transparent',
              borderRadius: '2px',
              transition: 'background-color 0.2s',
            //   ':hover': {
            //     backgroundColor: '#f0f0f0'
            //   }
            }}
            onMouseDown={(e) => handleMouseDown(columnIndex, e)}
          >
            <span 
              style={{ 
                fontSize: '18px',
                color: isDragging ? '#333' : '#666',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              ⋮
            </span>
          </div>
        </div>
  );
}

export default HeaderGridCell;
