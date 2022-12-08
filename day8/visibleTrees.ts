import {readInput} from "../read-input";

export default function visibleTrees() {
  const treeRows = readInput(`${__dirname}/input.txt`)
    .split("\n")
    .map(row => row.split(""));
  const rowSize = treeRows[0].length;
  const columnSize = treeRows.length;

  const visibleTreeCoordinates = new Set<string>();
  for(let x = 0; x < columnSize; x++) {
    const line = treeRows[x];
    let leftToRightCurrentHighest = -1;
    let rightToLeftCurrentHighest = -1;
    for(let y = 0; y < rowSize; y++){
      const reverseY = rowSize - (y + 1);
      const currentTreeLtoR = +line[y];
      const currentTreeRtoL = +line[reverseY];
      if(currentTreeLtoR > leftToRightCurrentHighest) {
        visibleTreeCoordinates.add(`${x}-${y}`);
        leftToRightCurrentHighest = currentTreeLtoR;
      }
      if(currentTreeRtoL > rightToLeftCurrentHighest) {
        visibleTreeCoordinates.add(`${x}-${reverseY}`);
        rightToLeftCurrentHighest = currentTreeRtoL;
      }
    }
  }
  for(let y = 0; y < rowSize; y++) {
    let topToBottomCurrentHighest = -1;
    let bottomToTopCurrentHighest = -1;
    for(let x = 0; x < columnSize; x++){
      const reverseX = columnSize - (x + 1);
      const currentTreeTtoB = +treeRows[x][y];
      const currentTreeBtoT = +treeRows[reverseX][y];
      if(currentTreeTtoB > topToBottomCurrentHighest) {
        visibleTreeCoordinates.add(`${x}-${y}`);
        topToBottomCurrentHighest = currentTreeTtoB;
      }
      if(currentTreeBtoT > bottomToTopCurrentHighest) {
        visibleTreeCoordinates.add(`${reverseX}-${y}`);
        bottomToTopCurrentHighest = currentTreeBtoT;
      }
    }
  }

  return visibleTreeCoordinates.size;
}

console.log(visibleTrees());