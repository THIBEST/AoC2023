import { readFileSync } from "fs";
import { join } from "path";

class CubeConundrum {
  /**
   * Calculates the sum of the indices of the lines in the input text file
   * where a game is possible.
   *
   * @return {number} The sum of the indices of the lines where a game is possible.
   */
  getSumOfPowersOfSets(): number {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    const dataLines = fileContent.split("\n");

    const sumOfPowers = dataLines.reduce(
      (acc: number, line: string) => this.getSumOfPowersReducer(acc, line),
      0
    );

    return sumOfPowers;
  }

  /**
   * A reducer function that calculates the sum of powers.
   *
   * @param {number} acc - The accumulated value.
   * @param {string} line - The line to process.
   * @return {number} The updated accumulated value.
   */
  private getSumOfPowersReducer(acc: number, line: string) {
    const sets = this.getSets(line);
    const minimumConfiguration = this.getMinConfiguration(sets);
    const powerOfSet = this.getPowerOfSet(minimumConfiguration);
    return acc + powerOfSet;
  }

  /**
   * Splits the given line by ":" and returns an array of sets.
   *
   * @param {string} line - The line to process.
   * @return {string[]} An array of sets.
   */
  private getSets(line: string): string[] {
    const setsPart = line.split(":")[1].trim();
    const sets = setsPart.replace(/,\s/g, ",").replace(/;\s/g, ";").split(";");
    return sets;
  }

  /**
   * Returns the minimum configuration of red, green, and blue values from the given sets.
   *
   * @param {string[]} sets - An array of sets containing values and colors.
   * @return {{[key: string]: number}} - An object with the minimum values of red, green, and blue.
   */
  private getMinConfiguration(sets: string[]): { [key: string]: number } {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    for (const set of sets) {
      const values = set.split(",");
      for (const value of values) {
        const [number, color] = value.split(" ");
        switch (color) {
          case "red":
            minRed = Math.max(minRed, parseInt(number));
            break;
          case "green":
            minGreen = Math.max(minGreen, parseInt(number));
            break;
          case "blue":
            minBlue = Math.max(minBlue, parseInt(number));
            break;
        }
      }
    }
    return { minRed, minGreen, minBlue };
  }

  /**
   * Calculates the power of a set.
   *
   * @param {Object} set - The set containing key-value pairs of numbers and colors.
   * @return {number} The result of raising each value in the set to the power of 5 and summing them.
   */
  private getPowerOfSet(set: { [key: string]: number }): number {
    const { minRed, minGreen, minBlue } = set;
    return minRed * minGreen * minBlue;
  }
}

const cubeConundrum = new CubeConundrum();
const sumOfPowers = cubeConundrum.getSumOfPowersOfSets();
console.log(sumOfPowers);
