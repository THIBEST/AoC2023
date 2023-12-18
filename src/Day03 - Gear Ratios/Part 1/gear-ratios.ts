import { readFileSync } from "fs";
import { join } from "path";

class GearRatios {
  dataLines: string[];

  constructor() {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    this.dataLines = fileContent.split("\n");
  }

  /**
   * Calculates the sum of the part numbers in the data lines.
   *
   * @return {number} The sum of the part numbers.
   */
  getSumOfPartnumbers(): number {
    let sumOfPartnumbers = 0;

    for (let lineIndex = 0; lineIndex < this.dataLines.length; lineIndex++) {
      const line = this.dataLines[lineIndex];

      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const parsedNumber = parseInt(line[charIndex]);
        if (isNaN(parsedNumber)) {
          continue;
        }

        let numberIndex = charIndex;
        let number = parsedNumber;

        while (
          numberIndex + 1 < line.length &&
          !isNaN(parseInt(line[numberIndex + 1]))
        ) {
          numberIndex++;
          number = number * 10 + parseInt(line[numberIndex]);
        }

        for (let t = charIndex; t <= numberIndex; t++) {
          if (this.checkSides(lineIndex, t)) {
            sumOfPartnumbers += number;
            break;
          }
        }
        charIndex = numberIndex;
      }
    }

    return sumOfPartnumbers;
  }

  /**
   * Check the sides of a given position in the dataLines array to see if there
   * is a symbol present.
   *
   * @param {number} lineIndex - The index of the line in the dataLines array.
   * @param {number} charIndex - The index of the character in the line.
   * @return {boolean} Returns true if a symbol is present in any of the adjacent
   * sides, otherwise returns false.
   */
  private checkSides(lineIndex: number, charIndex: number): boolean {
    const adjacentIndexes = [
      [lineIndex - 1, charIndex - 1],
      [lineIndex - 1, charIndex],
      [lineIndex - 1, charIndex + 1],
      [lineIndex, charIndex - 1],
      [lineIndex, charIndex + 1],
      [lineIndex + 1, charIndex - 1],
      [lineIndex + 1, charIndex],
      [lineIndex + 1, charIndex + 1],
    ];

    for (const adjacentIndex of adjacentIndexes) {
      const [lineIdx, charIdx] = adjacentIndex;
      if (
        lineIdx >= 0 &&
        lineIdx < this.dataLines.length &&
        charIdx >= 0 &&
        charIdx < this.dataLines[lineIdx].length &&
        this.checkIfSymbol(lineIdx, charIdx)
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the character at the specified line and index position
   * is a symbol.
   *
   * @param {number} lineIndex - The index of the line.
   * @param {number} charIndex - The index of the character in the line.
   * @return {boolean} Returns true if the character is a symbol,
   *                   otherwise returns false.
   */
  private checkIfSymbol(lineIndex: number, charIndex: number): boolean {
    const regex = /[^0-9.]/;
    return regex.test(this.dataLines[lineIndex][charIndex]);
  }
}

const gearRatios = new GearRatios();
const sumOfPartnumbers = gearRatios.getSumOfPartnumbers();
console.log("TOTAL: ", sumOfPartnumbers);
