import { readFileSync } from "fs";
import { join } from "path";

class Scratchcards {
  dataLines: string[];

  constructor() {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    this.dataLines = fileContent.split("\n");
    this.formatLines();
  }

  /**
   * Formats the lines of data.
   *
   * @return {void} - This function does not return anything.
   */
  private formatLines(): void {
    this.dataLines = this.dataLines.map((line) => line.split(":")[1].trim());
  }

  /**
   * Calculates the total points for all scratchcards.
   *
   * @return {number} The total points for all scratchcards.
   */
  getScratchcardsPoints(): number {
    let totalPoints = 0;
    for (const line of this.dataLines) {
      totalPoints += this.getLinePoints(line);
    }
    return totalPoints;
  }

  /**
   * Calculates the number of winning numbers in a given line.
   *
   * @param {string} line - The line to analyze.
   * @return {number} The number of winning numbers or 0 if there are none.
   */
  private getLinePoints(line: string): number {
    const lineSplit = line.split(" | ");
    const winningNumbers = lineSplit[0].trim().split(" ");
    const playingNumbers = lineSplit[1].trim().replace(/ {2}/g, " ").split(" ");

    let nbOfWiningNumbers = 0;
    for (const playingNumber of playingNumbers) {
      if (winningNumbers.includes(playingNumber)) {
        nbOfWiningNumbers++;
      }
    }
    return nbOfWiningNumbers > 0 ? Math.pow(2, nbOfWiningNumbers - 1) : 0;
  }
}

const scratchcards = new Scratchcards();
const scratchcardsPoints = scratchcards.getScratchcardsPoints();
console.log("TOTAL: ", scratchcardsPoints);