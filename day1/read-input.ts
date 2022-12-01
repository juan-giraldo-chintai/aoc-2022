import { readFileSync } from "fs";

export function readInput() {
  try {
    const data = readFileSync( `${__dirname}/input.txt`, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}