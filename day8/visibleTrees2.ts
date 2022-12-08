import {readInput} from "../read-input";

export default function visibleTrees() {
  const treeRows = readInput(`${__dirname}/input.txt`)
    .split("\n")
    .map(row => row.split(""));
  const rowSize = treeRows[0].length;
  const columnSize = treeRows.length;
  const scores = [];
  const calculateScenicScore = (row: number, column: number) => {
    let score = 1
    let currentScore = 0;
    const height = +treeRows[row][column];
    for(let i = 0; i < column; i++) {
      if(+treeRows[row][i] < height) {
        currentScore +=1;
      } else {
        currentScore = 1;
      }
    }
    score *= currentScore;
    currentScore = 0;
    for(let i = columnSize -1; i > column; i--) {
      if(+treeRows[row][i] < height) {
        currentScore +=1;
      } else {
        currentScore = 1;
      }
    }
    score *= currentScore;
    currentScore = 0;
    for(let i = 0; i < row; i++) {
      if(+treeRows[i][column] < height) {
        currentScore +=1;
      } else {
        currentScore = 1;
      }
    }
    score *= currentScore;
    currentScore = 0;
    for(let i = rowSize -1; i > row; i--) {
      if(+treeRows[i][column] < height) {
        currentScore +=1;
      } else {
        currentScore = 1;
      }
    }
    score *= currentScore;
    return score;
  }
  for(let x = 0; x < columnSize; x++) {
    for(let y = 0; y < rowSize; y++) {
      scores.push(calculateScenicScore(x, y));
    }
  }

  return scores.sort((a,b) => b-a)[0];
}

console.log(visibleTrees());