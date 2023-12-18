import { readFileSync } from "fs";
import { join } from "path";

class Scratchcards {
  dataLines: string[];
  scratchcardsList: {
    id: number;
    winningNumbers: string[];
    playingNumbers: string[];
    howMany: number;
  }[] = [];

  constructor() {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    this.dataLines = fileContent.split("\n");
    this.formatLines();
    this.createScratchcards();
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
   * Creates scratchcards based on the data lines.
   *
   * @private
   * @returns {void} The function does not return a value.
   */
  private createScratchcards(): void {
    for (const line of this.dataLines) {
      const lineSplit = line.split(" | ");
      const winningNumbers = lineSplit[0].trim().split(" ");
      const playingNumbers = lineSplit[1]
        .trim()
        .replace(/ {2}/g, " ")
        .split(" ");
      const howMany = 1;
      this.scratchcardsList.push({
        id: this.scratchcardsList.length + 1,
        winningNumbers,
        playingNumbers,
        howMany,
      });
    }
  }

  /**
   * Calculates the total number of scratchcards.
   *
   * @return {number} The total number of scratchcards.
   */
  getnumberOfScratchcards(): number {
    let totalScratchcards = 0;
    for (const scratchcard of this.scratchcardsList) {
      this.processScratchcard(scratchcard);
      totalScratchcards += scratchcard.howMany;
    }
    return totalScratchcards;
  }

  /**
   * Calculates the number of winning numbers in a given line.
   *
   * @param {string} scratchcard - The line to analyze.
   * @return {number} The number of winning numbers or 0 if there are none.
   */
  private processScratchcard(scratchcard: any): void {
    const nbOfMatchingNumbers = scratchcard.playingNumbers.reduce(
      (matches: number, playingNumber: string) => {
        if (scratchcard.winningNumbers.includes(playingNumber)) {
          return matches + 1;
        }
        return matches;
      },
      0
    );

    this.scratchcardsList
      .slice(scratchcard.id, scratchcard.id + nbOfMatchingNumbers)
      .forEach((card) => {
        card.howMany += scratchcard.howMany;
      });
  }
}

const scratchcards = new Scratchcards();
const scratchcardsPoints = scratchcards.getnumberOfScratchcards();
console.log("TOTAL:", scratchcardsPoints);
