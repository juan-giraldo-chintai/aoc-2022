import {readInput} from "../read-input";

export default function calories() {
  const input: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  let highestCaloricCount = 0;
  let currentCaloricCount = 0;
  for(let line of input) {
    const currentItem = parseInt(line.trim());
    if (isNaN(currentItem)) {
      highestCaloricCount = highestCaloricCount < currentCaloricCount
        ? currentCaloricCount
        : highestCaloricCount;
      currentCaloricCount = 0
    } else {
      currentCaloricCount += currentItem;
    }
  }
  return highestCaloricCount;
}
