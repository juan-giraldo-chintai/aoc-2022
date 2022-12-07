import {readInput} from "../read-input";
const MIN_FREE_SPACE = 30_000_000;
const MAX_SPACE = 70_000_000;
interface DirectoryInfo {
  name: string; 
  size: number;
}
class Directory {
  contents: Map<string,Directory | DataFile> = new Map();
  parent: Directory = null;
  constructor(public name: string) {}
  addNewChild(child: Directory | DataFile) {
    if(child instanceof Directory) {
      child.setParent(this);
    }
    this.contents.set(child.name, child);
  }
  setParent(parent: Directory) {
    this.parent = parent;
  }
  navigateTo(childName: string): Directory {
    return this.contents.get(childName) as Directory;
  }
  get size() {
    let totalSize = 0;
    this.contents.forEach(item => {
      totalSize += item.size;
    })
    return totalSize
  }
  get sizeForDirsUnder100_000() {
    let totalSize = 0;
    this.contents.forEach(item => {
      if(item instanceof Directory) {
        const currentSize = item.size;
        if(currentSize < 100_000) totalSize+= currentSize;
        totalSize += item.sizeForDirsUnder100_000;
      }
      return;
    })
    return totalSize;
  }
  static flatDirectoriesFor(directory: Directory): DirectoryInfo[] {
    const flatMap = [{name: directory.name, size: directory.size}];
    directory.contents.forEach(item => {
      if(item instanceof Directory) {
        flatMap.push(...Directory.flatDirectoriesFor(item));
      }
    });
    return flatMap;
  }
}
class DataFile {
  constructor(public name: string, public size: number) {}
}

export default function fileDirectory() {
  const root = new Directory("/");
  let currentDirectory: Directory;
  function executeCommand(command: string, directory: Directory) {
    const [_dollarSign, instruction, path] = command.split(" ");
    if(instruction === "cd") {
      if(path === "/") return root;

      if(path === "..") return directory.parent;
      return directory.navigateTo(path);
    }
    return directory
  }
  const cliCommandsNOutput = readInput(`${__dirname}/input.txt`).split("\n");
  for(let line of cliCommandsNOutput) {
    if(line[0] === "$") {
      currentDirectory = executeCommand(line, currentDirectory);
    } else {
      const [typeOrSize, name] = line.split(" ");
      if(typeOrSize === "dir") {
        currentDirectory.addNewChild(new Directory(name));
      } else {
        const size = parseInt(typeOrSize);
        currentDirectory.addNewChild(new DataFile(name, size));
      }
    }
  }
  const rootSize = root.size;
  const sizeToBeFreed = Directory.flatDirectoriesFor(root)
    .filter(a => a.size > MIN_FREE_SPACE -(MAX_SPACE - rootSize))
    .sort((a,b) => a.size - b.size)[0]
    .size
  return [
    root.sizeForDirsUnder100_000,
    sizeToBeFreed,
    ];
}

console.log(fileDirectory());