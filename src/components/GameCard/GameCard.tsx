import { FC, useState, PointerEvent, Dispatch, SetStateAction, memo } from 'react';
import styles from './GameCard.module.css';
import { ReactComponent as MagicWand } from '../../assets/images/magic-wand.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedRedux';
import { setResultGame } from '../../store/ResultGameSlice';
import PlayingField from '../PlayingField/PlayingField';
import Button from '../Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow';
import { getRandomNumber, getRandomGroupNumbers } from '../../utils';
import { postSelectedNumbers } from '../../services/service';

export interface IField {
  id: number;
  selected: boolean;
}

const sizeFirstField = 19;
const sizeSecondField = 2;
const firstField: IField[] = [];
for (let i = 0; i < sizeFirstField; i++) {
  firstField.push({
    id: i + 1,
    selected: false,
  });
}
const secondField: IField[] = [];
for (let i = 0; i < sizeSecondField; i++) {
  secondField.push({
    id: i + 1,
    selected: false,
  });
}

const GameCard: FC<{ headerTicket: string }> = memo(({ headerTicket }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedCellsFirstField, selectCellFirstField] = useState<IField[]>(firstField);
  const [selectedCellsSecondField, selectCellSecondField] = useState<IField[]>(secondField);
  const limitFirstField = 8;
  const limitSecondField = 1;
  const [isOpenWindow, setOpenWindow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpenErrorWindow, setOpenErrorWindow] = useState<boolean>(false);

  function getResults() {
    const choosenNumbersFirstField = selectedCellsFirstField.filter(item => item.selected).map(item => item.id);
    if (choosenNumbersFirstField.length < limitFirstField) {
      setOpenWindow(true);
      return;
    }
    const generatedGroupOfNums = getRandomGroupNumbers(1, sizeFirstField, limitFirstField);
    let numberOfMatchFirstField = 0;
    choosenNumbersFirstField.forEach(number => {
      if (generatedGroupOfNums[number]) ++numberOfMatchFirstField;
    });
    const generatedNum = getRandomNumber(1, sizeSecondField);
    const choosenNumbersSecondField = selectedCellsSecondField.filter(item => item.selected).map(item => item.id);
    if (choosenNumbersSecondField.length < limitSecondField) {
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
    postRequest(choosenNumbersFirstField, choosenNumbersSecondField, resultGame, 3);
  }

  function postRequest(firstFieldNums: number[], secondFieldNums: number[], resultGame: boolean, numberRepeat = 3) {
    const postData = {
      selectedNumber: {
        firstField: firstFieldNums,
        secondField: secondFieldNums,
      },
      isTicketWon: resultGame,
    };
    postSelectedNumbers(postData)
      .then(data => {
        console.log(postData, data);
        setLoading(false);
        navigate('/result');
      })
      .catch(error => {
        if (numberRepeat > 0) {
          console.log(error, 'Повторная отправка данных');
          setTimeout(postRequest, 2000, firstFieldNums, secondFieldNums, resultGame, numberRepeat - 1);
        }
        if (numberRepeat === 0) {
          setLoading(false);
          setOpenErrorWindow(true);
          return;
        }
      });
  }

  function fillRandomGroupNumbers() {
    const generatedGroupOfNums = getRandomGroupNumbers(1, sizeFirstField, limitFirstField);
    selectCellFirstField(prev =>
      prev.map(item => (generatedGroupOfNums[item.id] ? { ...item, selected: true } : { ...item, selected: false })),
    );
    const generatedNum = getRandomNumber(1, sizeSecondField);
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
          limit={limitFirstField}
        />
        <PlayingField
          headerField="Поле 2"
          descriptionField="Отметьте 1 число."
          selectedCells={selectedCellsSecondField}
          selectorCells={selectCellSecondField}
          limit={limitSecondField}
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
