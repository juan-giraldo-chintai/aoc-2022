import {readInput} from "../read-input";

enum Moves {
  Rock = 1,
  Paper,
  Scissors
}
enum Results {
  Lose = 0,
  Draw = 3,
  Win = 6
}
const rivalMovesMap = {
  A: Moves.Rock,
  B: Moves.Paper,
  C: Moves.Scissors
}
const expectedResult = {
  X: Results.Lose,
  Y: Results.Draw,
  Z: Results.Win
}

function calculateMyScore(rival: string, me: string): number {
  const rivalMove = rivalMovesMap[rival];
  const result = expectedResult[me]
  let myMove = 0;
  switch (result) {
    case Results.Draw:
      myMove = rivalMove;
      break;
    case Results.Lose:
      myMove = rivalMove - 1;
      break;
    default:
      myMove = rivalMove + 1;
      break;
  }
  if(myMove === 0) myMove = Moves.Scissors;
  if(myMove === 4) myMove = Moves.Rock;
  return myMove + result;
}

export default function score() {
  const rounds: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  let total = 0;
  for(let round of rounds) {
    const [rivalMove, result] = round.split(" ");
    const roundValue = calculateMyScore(rivalMove, result);
    total+= roundValue;
  }
  return total;
}

console.log(score())