import { FC, Dispatch, SetStateAction, PointerEvent, memo } from 'react';
import styles from './PlayingField.module.css';
import { IField } from '../GameCard/GameCard';

interface IPayingFieldProps {
  headerField: string;
  descriptionField: string;
  selectedCells: IField[];
  selectorCells: Dispatch<SetStateAction<IField[]>>;
  limit: number;
}

const PlayingField: FC<IPayingFieldProps> = memo(
  ({ headerField, descriptionField, selectedCells, selectorCells, limit }) => {
    function selectCell(event: PointerEvent, id: number, limit: number): void {
      event.preventDefault();
      const choosenNumbersOfField = selectedCells.filter(item => item.selected).length;
      if (choosenNumbersOfField >= limit) return;
      selectorCells(prev => prev.map(item => (item.id === id ? { ...item, selected: true } : item)));
    }

    return (
      <div>
        <div className={styles.descriptionField}>
          <span className={styles.nameField}>{headerField}</span>
          <span className={styles.rulesOfField}>{descriptionField}</span>
        </div>
        <div className={styles.playingField}>
          {selectedCells.map(item => (
            <div
              key={item.id}
              className={`${styles.playingCell} ${item.selected ? styles.activeCell : ''}`}
              onPointerDown={event => selectCell(event, item.id, limit)}
            >
              {item.id}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default PlayingField;
