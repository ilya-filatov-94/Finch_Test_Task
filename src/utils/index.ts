export function setPayingFieldData(limit: number) {
  const field = [];
  for (let i = 0; i < limit; i++) {
    field.push({
      id: i + 1,
      selected: false,
    });
  }
  return field;
}

export function getRandomGroupNumbers(min: number, max: number, limit: number) {
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

export function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
