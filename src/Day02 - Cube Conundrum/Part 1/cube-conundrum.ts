import { readFileSync } from "fs";
import { join } from "path";

class CubeConundrum {
  maxRed: number;
  maxGreen: number;
  maxBlue: number;

  constructor(maxRed: number, maxGreen: number, maxBlue: number) {
    this.maxRed = maxRed;
    this.maxGreen = maxGreen;
    this.maxBlue = maxBlue;
  }
  getIdSumPossibleGames(): number {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    const dataLines = fileContent.split("\n");

    const idSumPossibleGames = dataLines.reduce(
      (acc: number, line: string, index: number) => {
        const sets = this.getSets(line);
        if (this.isGamePossible(sets)) {
          return acc + index + 1;
        } else {
          return acc;
        }
      },
      0
    );

    return idSumPossibleGames;
  }

  private getSets(line: string): string[] {
    return line
      .split(":")[1]
      .replace(/,\s/g, ",")
      .replace(/;\s/g, ";")
      .split(";");
  }

  private isGamePossible(sets: string[]): boolean {
    for (const set of sets) {
      const values = set.split(",");
      for (const value of values) {
        const number = parseInt(value.split(" ")[0]);
        const color = value.split(" ")[1];

        if (
          (color === "red" && number > this.maxRed) ||
          (color === "green" && number > this.maxGreen) ||
          (color === "blue" && number > this.maxBlue)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}

const cubeConundrum = new CubeConundrum(12, 13, 14);
const idSumPossibleGames = cubeConundrum.getIdSumPossibleGames();
console.log(idSumPossibleGames);
