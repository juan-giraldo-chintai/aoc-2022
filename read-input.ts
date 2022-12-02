import { readFileSync } from "fs";

export function readInput(path: string) {
  try {
    const data = readFileSync( path, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}