import {readInput} from "../read-input";

enum Moves {
  Rock = 1,
  Paper,
  Scissors
}
const rivalMovesMap = {
  A: Moves.Rock,
  B: Moves.Paper,
  C: Moves.Scissors
}
const meMovesMap = {
  X: Moves.Rock,
  Y: Moves.Paper,
  Z: Moves.Scissors
}

function calculateMyScore(rival: string, me: string): number {
  const rivalMove = rivalMovesMap[rival];
  const myMove = meMovesMap[me];
  let score = myMove - rivalMove;
  if (score > 1 || score === -1)
    return 0;
  if (score === 0)
    return 3;
  return 6;
}

export default function score() {
  const rounds: string[] = readInput(`${__dirname}/input.txt`).split("\n");
  let total = 0;
  for(let round of rounds) {
    const [rivalMove, meMove] = round.split(" ");
    const roundValue = meMovesMap[meMove] + calculateMyScore(rivalMove, meMove);
    total+= roundValue;
  }
  return total;
}

console.log(score())