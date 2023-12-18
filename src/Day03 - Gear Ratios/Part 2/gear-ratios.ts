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
  getSumOfGearRatios(): number {
    let sumOfGearRatios = 0;

    for (let lineIndex = 0; lineIndex < this.dataLines.length; lineIndex++) {
      const line = this.dataLines[lineIndex];

      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const char = line[charIndex];
        if (char !== "*") {
          continue;
        }

        sumOfGearRatios += this.getGearValue(lineIndex, charIndex);
      }
    }

    return sumOfGearRatios;
  }

  /**
   * Retrieves the gear value based on the given line index and character index.
   *
   * @param {number} lineIndex - The index of the line.
   * @param {number} charIndex - The index of the character.
   * @return {number} The gear value calculated based on the given indices.
   */
  private getGearValue(lineIndex: number, charIndex: number): number {
    let sidesWithNumber = this.getSidesWithNumber(lineIndex, charIndex);
    sidesWithNumber = this.filterConsecutivePositions(sidesWithNumber);
    return this.calculateGearValue(sidesWithNumber);
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
  private getSidesWithNumber(
    lineIndex: number,
    charIndex: number
  ): [number, number][] {
    const indexesOfSides: [number, number][] = [];

    const adjacentIndexes: [number, number][] = [
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
        this.checkIfNumber(lineIdx, charIdx)
      ) {
        indexesOfSides.push(adjacentIndex);
      }
    }

    return indexesOfSides;
  }

  /**
   * Checks if the character at the specified line and index position
   * is a number.
   *
   * @param {number} lineIndex - The index of the line.
   * @param {number} charIndex - The index of the character in the line.
   * @return {boolean} Returns true if the character is a number,
   *                   otherwise returns false.
   */
  private checkIfNumber(lineIndex: number, charIndex: number): boolean {
    const regex = /\d/;
    return regex.test(this.dataLines[lineIndex][charIndex]);
  }

  /**
   * Filters out consecutive positions from an array of positions.
   *
   * @param {Array<[number, number]>} positions - The array of positions to filter.
   * @return {Array<[number, number]>} The filtered array of positions.
   */
  filterConsecutivePositions(
    positions: [number, number][]
  ): [number, number][] {
    let prevPos: [number, number] | null = null;

    return positions.reduce<[number, number][]>((filteredArr, currPos) => {
      if (
        !prevPos ||
        currPos[0] !== prevPos[0] ||
        currPos[1] !== prevPos[1] + 1
      ) {
        filteredArr.push(currPos);
      }
      prevPos = currPos;
      return filteredArr;
    }, []);
  }

  /**
   * Calculates the gear value based on the sides with numbers.
   *
   * @param {Array<[number, number]>} sidesWithNumber - An array of tuples representing the line index and character index of sides with numbers.
   * @return {number} The calculated gear value.
   */
  private calculateGearValue(sidesWithNumber: [number, number][]): number {
    if (sidesWithNumber.length !== 2) {
      return 0;
    }

    let firstNumber = -1;
    let secondNumber = -1;

    for (const sideWithNumber of sidesWithNumber) {
      const [lineIdx, charIdx] = sideWithNumber;
      if (firstNumber === -1) {
        firstNumber = this.createNumber(lineIdx, charIdx);
      } else if (secondNumber === -1) {
        secondNumber = this.createNumber(lineIdx, charIdx);
      } else {
        break;
      }
    }

    firstNumber = firstNumber !== -1 ? firstNumber : 0;
    secondNumber = secondNumber !== -1 ? secondNumber : 0;
    return firstNumber * secondNumber;
  }

  /**
   * Creates a number based on the given line index and character index.
   *
   * @param {number} lineIndex - The index of the line.
   * @param {number} charIndex - The index of the character.
   * @return {number} The created number.
   */
  private createNumber(lineIndex: number, charIndex: number): number {
    let number = parseInt(this.dataLines[lineIndex][charIndex]);
    // Check recursively if there is a number on the left
    const initCharIndex = charIndex;
    while (charIndex - 1 >= 0 && this.checkIfNumber(lineIndex, charIndex - 1)) {
      number =
        parseInt(this.dataLines[lineIndex][charIndex - 1]) *
          Math.pow(10, initCharIndex - charIndex + 1) +
        number;
      charIndex--;
    }

    // Check recursively if there is a number on the right
    charIndex = initCharIndex;
    while (
      charIndex + 1 < this.dataLines[lineIndex].length &&
      this.checkIfNumber(lineIndex, charIndex + 1)
    ) {
      number = number * 10 + parseInt(this.dataLines[lineIndex][charIndex + 1]);
      charIndex++;
    }
    return number;
  }
}

const gearRatios = new GearRatios();
const sumOfGearRatios = gearRatios.getSumOfGearRatios();
console.log("TOTAL: ", sumOfGearRatios);