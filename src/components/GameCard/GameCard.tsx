import { FC, useState, PointerEvent, Dispatch, SetStateAction, memo } from 'react';
import styles from './GameCard.module.css';
import { ReactComponent as MagicWand } from '../../assets/images/magic-wand.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedRedux';
import { setResultGame } from '../../store/ResultGameSlice';
import Button from '../Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow';
import { postSelectedNumbers } from '../../services/service';

interface IField {
  id: number;
  selected: boolean;
}

const firstField: IField[] = [];
for (let i = 0; i < 19; i++) {
  firstField.push({
    id: i + 1,
    selected: false,
  });
}
const secondField: IField[] = [];
for (let i = 0; i < 2; i++) {
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
  const [counterOfFirstField, setCounterOfFirstField] = useState<number>(0);
  const [counterOfSecondField, setCounterOfSecondField] = useState<number>(0);
  const limitFirstField = 8;
  const limitSecondField = 1;
  const [isOpenWindow, setOpenWindow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpenErrorWindow, setOpenErrorWindow] = useState<boolean>(false);

  function selectCell(
    event: PointerEvent,
    id: number,
    selectorCells: Dispatch<SetStateAction<IField[]>>,
    currentStateCounter: number,
    selectorCounter: Dispatch<SetStateAction<number>>,
    limit: number,
  ): void {
    event.preventDefault();
    if (currentStateCounter >= limit) return;
    selectorCells(prev => prev.map(item => (item.id === id ? { ...item, selected: true } : item)));
    selectorCounter(prev => prev + 1);
  }

  function getResults() {
    const choosenNumbersFirstField = selectedCellsFirstField.filter(item => item.selected).map(item => item.id);
    if (choosenNumbersFirstField.length < limitFirstField) {
      setOpenWindow(true);
      return;
    }
    const generatedGroupOfNums = getRandomGroupNumbers(1, 19, limitFirstField);
    let numberOfMatchFirstField = 0;
    choosenNumbersFirstField.forEach(number => {
      if (generatedGroupOfNums[number]) ++numberOfMatchFirstField;
    });
    const generatedNum = getRandomNumber(1, 2);
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
    const generatedGroupOfNums = getRandomGroupNumbers(1, 19, limitFirstField);
    selectCellFirstField(prev =>
      prev.map(item => (generatedGroupOfNums[item.id] ? { ...item, selected: true } : { ...item, selected: false })),
    );
    const generatedNum = getRandomNumber(1, 2);
    selectCellSecondField(prev =>
      prev.map(item => (item.id === generatedNum ? { ...item, selected: true } : { ...item, selected: false })),
    );
  }

  function getRandomGroupNumbers(min: number, max: number, limit: number) {
    const generatedGroupOfNums: Record<string, number> = {};
    let counter = 0;
    while (counter < limit) {
      const number = getRandomNumber(min, max);
      if (!generatedGroupOfNums[number]) {
        generatedGroupOfNums[number] = 1;
        ++counter;
      }
    }
    return generatedGroupOfNums;
  }

  function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.header}>
          <h1>{headerTicket}</h1>
          <MagicWand style={{ width: '1.090625rem', height: '1.0891rem', cursor: 'pointer' }} onPointerDown={fillRandomGroupNumbers} />
        </div>
        <div className={styles.descriptionField}>
          <span className={styles.nameField}>Поле 1</span>
          <span className={styles.rulesOfField}>Отметьте 8 чисел.</span>
        </div>
        <div className={styles.playingField}>
          {selectedCellsFirstField.map(item => (
            <div
              key={item.id}
              className={`${styles.playingCell} ${item.selected ? styles.activeCell : ''}`}
              onPointerDown={event =>
                selectCell(event, item.id, selectCellFirstField, counterOfFirstField, setCounterOfFirstField, limitFirstField)
              }
            >
              {item.id}
            </div>
          ))}
        </div>
        <div className={styles.descriptionField}>
          <span className={styles.nameField}>Поле 2</span>
          <span className={styles.rulesOfField}>Отметьте 1 число.</span>
        </div>
        <div className={styles.playingField}>
          {selectedCellsSecondField.map(item => (
            <div
              key={item.id + 100}
              className={`${styles.playingCell} ${item.selected ? styles.activeCell : ''}`}
              onPointerDown={event =>
                selectCell(event, item.id, selectCellSecondField, counterOfSecondField, setCounterOfSecondField, limitSecondField)
              }
            >
              {item.id}
            </div>
          ))}
        </div>
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
