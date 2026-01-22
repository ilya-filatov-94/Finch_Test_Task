import { 
  FC,
  useState, 
  useRef, 
  useEffect, 
  useCallback,
  MouseEvent
} from "react";
import { MultiGrid, GridCellProps, AutoSizer } from "react-virtualized";
import { columns, MIN_COLUMN_WIDTH, TDragState, TSizeCustomDataGrid, TWidths, IGridCellProps } from './parametersDataGrid';
import HeaderGridCell from "./HeaderGridCell";
import GridCell from './GridCell';
import { testDataPosts } from './testData';

// const INITIAL_WIDTHS = { 0: 150, 1: 200, 2: 150 };
const INITIAL_WIDTHS = columns?.reduce((acc, current, index) => {
    acc[index] = current?.minWidth || 0;
    return acc;
}, {} as TWidths);

const HEADER_HEIGHT = 50;
const ROW_HEIGHT = 50;

const CustomDataGrid: FC = () => {
  const [widths, setWidths] = useState<TWidths>(INITIAL_WIDTHS);
  const [dragState, setDragState] = useState<TDragState>({
    draggingColumn: null,
    dragStartX: 0,
    dragStartWidths: INITIAL_WIDTHS,
  });
  const [isLoading, setLoading] = useState(false);
  const isNullData = testDataPosts.length === 0;

    // Refs
  const gridRef = useRef<MultiGrid>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Обновление размеров грида
  useEffect(() => {
    if (gridRef.current && isMounted.current) {
      gridRef.current.recomputeGridSize();
    }
  }, [widths]);

  // Флаг монтирования для избежания вызова recomputeGridSize при первом рендере
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

    // Начало перетаскивания
  const handleMouseDown = useCallback((columnIndex: number, e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setDragState({
        draggingColumn: columnIndex,
        dragStartX: e.clientX,
        dragStartWidths: { ...widths }
      });
      
      // Блокируем выделение текста
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
  }, [widths]);

    // Перетаскивание
  const handleMouseMove = useCallback((e: MouseEvent) => {
      const { draggingColumn, dragStartX, dragStartWidths } = dragState;
      
      if (draggingColumn !== null) {
        const deltaX = e.clientX - dragStartX;

        const newWidth = Math.max(
          columns[dragState?.draggingColumn || 0]?.minWidth || MIN_COLUMN_WIDTH, 
          dragStartWidths[draggingColumn] + deltaX
        );
        
        setWidths(prevWidths => ({
          ...prevWidths,
          [draggingColumn]: newWidth
        }));
      }
  }, [dragState]);
  
    // Завершение перетаскивания
  const handleMouseUp = useCallback(() => {
      if (dragState.draggingColumn !== null) {
        // Восстанавливаем стандартные стили
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        
        setDragState(prev => ({ 
          ...prev, 
          draggingColumn: null 
        }));
      }
  }, [dragState.draggingColumn]);
  
    // Глобальные обработчики событий
  useEffect(() => {
      const handleMove = (e: MouseEvent) => handleMouseMove(e);
      const handleUp = () => handleMouseUp();
  
      document.addEventListener('mousemove', handleMove as any);
      document.addEventListener('mouseup', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove as any);
        document.removeEventListener('mouseup', handleUp);
      };
  }, [handleMouseMove, handleMouseUp]);

    // Комбинированный рендерер
  const cellRenderer = useCallback((props: GridCellProps & IGridCellProps): React.ReactNode => {
    const { rowIndex, key } = props;
    if (rowIndex === 0) {
    const newProps = {...props, newKey: `header-${key}`}
      return <HeaderGridCell { ...newProps}  />
    }
    const newProps = {...props, newKey: `row-${key}`}
    return <GridCell {...newProps} />;
  }, []);

  // Расчет ширины колонки
  const columnWidth = useCallback(({ index }: { index: number }): number => {
    return widths[index];
  }, [widths]);

    const resizedGrid = useCallback(() => {
        gridRef.current?.recomputeGridSize?.();
        gridRef.current?.forceUpdate?.();
    }, []);
  
    return (
      <div 
        ref={containerRef}
        style={{ 
          position: 'relative',
          cursor: dragState.draggingColumn !== null ? 'col-resize' : 'default',
          userSelect: dragState.draggingColumn !== null ? 'none' : 'auto',
          height: 'calc(100% - 100px)',
          width: '100%',
        }}
      >
        <AutoSizer onResize={resizedGrid}>
          {({ width, height }: TSizeCustomDataGrid) => (
            <MultiGrid
                overscanColumnCount={5}
                overscanRowCount={20}
                cellRenderer={(props: GridCellProps) => cellRenderer({
                    ...props, 
                    loading: isLoading,
                    data: testDataPosts,
                    columnDef: columns,
                    rowCount: testDataPosts.length || 0,
                    disableLoadingLastRow: false,
                    draggingColumn: dragState?.draggingColumn,
                    handleMouseDown: handleMouseDown
                })}
                fixedRowCount={1}
                height={isNullData ? HEADER_HEIGHT : height}
                width={width}
                columnCount={columns.length}
                columnWidth={columnWidth}
                rowCount={testDataPosts.length + 1}
                rowHeight={({ index }) => (index === 0 ? HEADER_HEIGHT : ROW_HEIGHT)}
                ref={gridRef}
                style={{ outline: 'none' }}
                styleTopLeftGrid={{
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #dee2e6'
                }}
                styleTopRightGrid={{
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #dee2e6'
                }}
            />
          )}
          </AutoSizer>
      </div>
    );
}

export default CustomDataGrid;
