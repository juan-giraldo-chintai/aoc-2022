import {readInput} from "../read-input";

export default function priorities() {
  const rucksackPairsList: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  const lowercaseNormalization = 96;
  const uppercaseNormalization = 38;
  let prioritiesSum = 0;
  for(let groupIndex = 0; groupIndex < rucksackPairsList.length; groupIndex += 3) {
    const elf1 = new Set(rucksackPairsList[groupIndex].split(""));
    const elf2 = new Set(rucksackPairsList[groupIndex + 1].split(""));
    const elf3 = rucksackPairsList[groupIndex + 2].split("");
    for(let item of elf3) {
      if (elf1.has(item) && elf2.has(item)) {
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