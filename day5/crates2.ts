import {readInput} from "../read-input";

export default function crates() {
  const lines = readInput(`${__dirname}/input.txt`).split("\n");
  let currentLine = lines[0].match(/.{1,4}/g);
  const maxCrateStacks = currentLine.length;
  const crateStacks = Array(maxCrateStacks);
  let i = 0;
  let areStacksIncomplete = true;
  while (areStacksIncomplete) {
    for(let x = 0; x < maxCrateStacks; x++){
      if(!isNaN(parseInt(currentLine[x]))) {
        areStacksIncomplete = false;
        break;
      }
      const crateWithoutSpaces = currentLine[x].trim();
      if(crateWithoutSpaces.length === 0){
        continue;
      }
      const actualValue = crateWithoutSpaces[1];
      if(crateStacks[x]) {
        crateStacks[x].unshift(actualValue);
      } else {
        crateStacks[x] = [actualValue];
      }
    }
    i +=1;
    currentLine = lines[i].match(/.{1,4}/g);
  }
  i += 1; // skip the empty line;
  for(i; i < lines.length; i ++) {
    const action = lines[i].match(/(\d)+/g);
    const [amountToMove, from, to] = action.map(item => parseInt(item));
    const fromStack = crateStacks[from -1];
    const toStack = crateStacks[to -1];
    const start = fromStack.length - amountToMove;
    toStack.push(...fromStack.splice(start, amountToMove));
  }
  let message = []
  for(let w = 0; w < maxCrateStacks; w++) {
    const currentStack = crateStacks[w];
    message.push(currentStack[currentStack.length - 1]);
  }
  return message.join("");
}
console.log(crates())