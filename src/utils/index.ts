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
