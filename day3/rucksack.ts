import {readInput} from "../read-input";

export default function priorities() {
  const rucksackPairsList: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  const lowercaseNormalization = 96;
  const uppercaseNormalization = 38;
  let prioritiesSum = 0;
  for(let rucksackPair of rucksackPairsList) {
    const startOfSecondRucksackPointer = rucksackPair.length/2;
    const firstRucksack = rucksackPair.slice(0, startOfSecondRucksackPointer).split("");
    const secondRucksack = rucksackPair.slice(startOfSecondRucksackPointer).split("");
    const visitedItems = new Set(firstRucksack);
    for(let item of secondRucksack) {
      if (visitedItems.has(item)) {
        const itemAscii = item.charCodeAt(0);
        const itemPriority = itemAscii - (itemAscii > lowercaseNormalization
            ? lowercaseNormalization
            : uppercaseNormalization);
        prioritiesSum += itemPriority;
        break;
      }
    }
  }
  return prioritiesSum;
}

console.log(priorities());