export const API_STUB = 'http://localhost:3001/results';

export interface IPostSelectedData {
  selectedNumber: {
    firstField: number[];
    secondField: number[];
  };
  isTicketWon: boolean;
}

export const postSelectedNumbers = (data: IPostSelectedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.75) {
        resolve(
          fetch(`${API_STUB}`, {
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
};
