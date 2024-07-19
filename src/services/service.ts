export interface IPostSelectedData {
  selectedNumber: {
    firstField: number[];
    secondField: number[];
  };
  isTicketWon: boolean;
}

export function postResultGame(
  postData: IPostSelectedData,
  resolveCallback: (...data: any) => void,
  rejectCallback: (...data: any) => void,
  numberRepeat = 3,
  delay = 2000,
) {
  postRequest(postData)
    .then(data => {
      resolveCallback(postData, data);
    })
    .catch(error => {
      if (numberRepeat > 0) {
        console.log(error, 'Повторная отправка данных');
        setTimeout(postResultGame, delay, postData, resolveCallback, rejectCallback, numberRepeat - 1);
      }
      if (numberRepeat === 0) {
        rejectCallback();
        return;
      }
    });
}

export function postRequest(data: IPostSelectedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.75) {
        resolve(
          fetch(`${process.env.REACT_APP_API_URL}`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(res => res),
        );
      } else {
        reject(new Error('Something bad happened with Request'));
      }
    }, 1000);
  });
}
