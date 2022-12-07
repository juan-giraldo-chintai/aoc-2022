import {readInput} from "../read-input";

const removeLetterFromMap = (letter: string, map: Map<string, number>) => {
  if(map.get(letter) > 1) {
    map.set(letter, map.get(letter) - 1);
  } else {
    map.delete(letter);
  }
}
const addLetterToMap = (letter: string, map: Map<string, number>) => {
  if(map.has(letter)) {
    map.set(letter, map.get(letter) + 1)
  } else {
    map.set(letter, 1)
  }
}
// Easy to solve using sliding window
export default function signal(size: number) {
  const message = readInput(`${__dirname}/input.txt`).split("");
  const signalMap = new Map<string, number>();
  let i = 0;
  while(signalMap.size < size && i < message.length - size) {
    if(i === 0) {
      for(let j = 0; j < size; j++) {
        const currentLetter = message[j];
        addLetterToMap(currentLetter, signalMap);
      }
    } else {
      const prevLetter = message[i - 1];
      const newLetter = message[i + size -1];
      removeLetterFromMap(prevLetter, signalMap);
      addLetterToMap(newLetter, signalMap);
    }
    console.log(signalMap);

    i++;
  }
  return i + size -1;
}

console.log(signal(4));// part 1
console.log(signal(14));// part 2

