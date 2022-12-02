import {readInput} from "../read-input";

export default function top3CaloricCount() {
  const input: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  const allCaloricCount = []
  let currentCaloricCount = 0;
  for(let line of input) {
    const currentItem = parseInt(line.trim());
    if (isNaN(currentItem)) {
      allCaloricCount.push(currentCaloricCount)
      currentCaloricCount = 0
    } else {
      currentCaloricCount += currentItem;
    }
  }
  const [first, second, third] = allCaloricCount.sort((a,b) =>
    b - a
  );
  return first + second + third;
}

console.log(top3CaloricCount())