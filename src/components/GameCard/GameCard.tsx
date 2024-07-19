import { FC, useState, PointerEvent, Dispatch, SetStateAction, memo } from 'react';
import styles from './GameCard.module.css';
import { ReactComponent as MagicWand } from '../../assets/images/magic-wand.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedRedux';
import { setResultGame } from '../../store/ResultGameSlice';
import PlayingField from '../PlayingField/PlayingField';
import Button from '../Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow';
import { setPayingFieldData, getRandomNumber, getRandomGroupNumbers } from '../../utils';
import { postResultGame, IPostSelectedData } from '../../services/service';

export interface IField {
  id: number;
  selected: boolean;
}

const SIZE_FIRST_FIELD = 19;
const SIZE_SECOND_FIELD = 2;
const LIMIT_FIRST_FIELD = 8;
const LIMIT_SECOND_FIELD = 1;

const GameCard: FC<{ headerTicket: string }> = memo(({ headerTicket }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedCellsFirstField, selectCellFirstField] = useState<IField[]>(setPayingFieldData(SIZE_FIRST_FIELD));
  const [selectedCellsSecondField, selectCellSecondField] = useState<IField[]>(setPayingFieldData(SIZE_SECOND_FIELD));
  const [isOpenWindow, setOpenWindow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpenErrorWindow, setOpenErrorWindow] = useState<boolean>(false);

  const successRequestCallback = (postData: IPostSelectedData, resultRequest: string) => {
    console.log(postData, resultRequest);
    setLoading(false);
    navigate('/result');
  };

  const rejectRequestCallback = () => {
    setLoading(false);
    setOpenErrorWindow(true);
  };

  function getResults() {
    const choosenNumbersFirstField = selectedCellsFirstField.filter(item => item.selected).map(item => item.id);
    if (choosenNumbersFirstField.length < LIMIT_FIRST_FIELD) {
      setOpenWindow(true);
      return;
    }
    const generatedGroupOfNums = getRandomGroupNumbers(1, SIZE_FIRST_FIELD, LIMIT_FIRST_FIELD);
    let numberOfMatchFirstField = 0;
    choosenNumbersFirstField.forEach(number => {
      if (generatedGroupOfNums[number]) ++numberOfMatchFirstField;
    });
    const generatedNum = getRandomNumber(1, SIZE_SECOND_FIELD);
    const choosenNumbersSecondField = selectedCellsSecondField.filter(item => item.selected).map(item => item.id);
    if (choosenNumbersSecondField.length < LIMIT_SECOND_FIELD) {
      setOpenWindow(true);
      return;
    }
    let numberOfMatchSecondField = 0;
    choosenNumbersSecondField.forEach(number => {
      if (generatedNum === number) ++numberOfMatchSecondField;
    });
    let resultGame = false;
    if (numberOfMatchFirstField >= 4) {
      resultGame = true;
    }
    if (numberOfMatchFirstField >= 3 && numberOfMatchSecondField === 1) {
      resultGame = true;
    }
    dispatch(setResultGame(resultGame));
    setLoading(true);
    const dataOfResult = {
      selectedNumber: {
        firstField: choosenNumbersFirstField,
        secondField: choosenNumbersSecondField,
      },
      isTicketWon: resultGame,
    };
    postResultGame(dataOfResult, successRequestCallback, rejectRequestCallback, 3, 2000);
  }

  function fillRandomGroupNumbers() {
    const generatedGroupOfNums = getRandomGroupNumbers(1, SIZE_FIRST_FIELD, LIMIT_FIRST_FIELD);
    selectCellFirstField(prev =>
      prev.map(item => (generatedGroupOfNums[item.id] ? { ...item, selected: true } : { ...item, selected: false })),
    );
    const generatedNum = getRandomNumber(1, SIZE_SECOND_FIELD);
    selectCellSecondField(prev =>
      prev.map(item => (item.id === generatedNum ? { ...item, selected: true } : { ...item, selected: false })),
    );
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.header}>
          <h1>{headerTicket}</h1>
          <MagicWand
            style={{ width: '1.090625rem', height: '1.0891rem', cursor: 'pointer' }}
            onPointerDown={fillRandomGroupNumbers}
          />
        </div>
        <PlayingField
          headerField="Поле 1"
          descriptionField="Отметьте 8 чисел."
          selectedCells={selectedCellsFirstField}
          selectorCells={selectCellFirstField}
          limit={LIMIT_FIRST_FIELD}
        />
        <PlayingField
          headerField="Поле 2"
          descriptionField="Отметьте 1 число."
          selectedCells={selectedCellsSecondField}
          selectorCells={selectCellSecondField}
          limit={LIMIT_SECOND_FIELD}
        />
      </div>
      <div className={styles.wrapperBtn}>
        <Button text="Показать результат" loading={isLoading} onPointerDown={getResults} />
      </div>
      <ModalWindow visible={isOpenWindow} setVisible={setOpenWindow}>
        <div className={styles.wrapperContentWindow}>
          <p>Выбраны не все числа!</p>
          <Button text="Ок" onPointerDown={() => setOpenWindow(false)} />
        </div>
      </ModalWindow>
      <ModalWindow visible={isOpenErrorWindow} setVisible={setOpenErrorWindow}>
        <div className={styles.wrapperContentWindow}>
          <p>Запрос трижды завершился с ошибкой!</p>
          <Button text="Ок" onPointerDown={() => setOpenErrorWindow(false)} />
        </div>
      </ModalWindow>
    </div>
  );
});

export default GameCard;
