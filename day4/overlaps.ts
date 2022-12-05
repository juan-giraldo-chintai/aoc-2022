import {readInput} from "../read-input";

interface ElfTurn {
  startRoom: number;
  endRoom: number;
}

export default function overlaps() {
  const elfPairTurns: string[] = readInput(`${__dirname}/input.txt`).split("\n");

  let totalFullOverlap = 0;
  for(let elfPairTurn of elfPairTurns) {
    const [firstTurn, secondTurn] = elfPairTurn.split(",");
    const [firstStartRoom, firstEndRoom] = firstTurn.split("-");
    const [secondStartRoom, secondEndRoom] = secondTurn.split("-");
    const elf1: ElfTurn = { startRoom: +firstStartRoom, endRoom: +firstEndRoom };
    const elf2: ElfTurn = { startRoom: +secondStartRoom, endRoom: +secondEndRoom };
    const pair = [elf1, elf2].sort((a, b) => {
      const startRoomDiff = a.startRoom - b.startRoom;
      if(startRoomDiff === 0) {
        // si empiezan igual, quiero que el primero en aparecer sea el de la habitacion final mas lejana
        return b.endRoom - a.endRoom
      }
      return startRoomDiff;
    });
    if(pair[0].startRoom <= pair[1].startRoom && pair[0].endRoom >= pair[1].endRoom) {
      totalFullOverlap+=1;
    }
  }
  return totalFullOverlap;
}

console.log(overlaps());