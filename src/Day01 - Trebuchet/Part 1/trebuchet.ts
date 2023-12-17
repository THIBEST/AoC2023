import { readFileSync } from "fs";
import { join } from "path";

class Trebuchet {
  /**
   * Retrieves the calibration value by reading data from a file and calculating the line calibration.
   *
   * @return {number} The calibration value.
   */
  getCalibrationValue(): number {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    const dataLines = fileContent.split("\n");

    const calibrationValue = dataLines.reduce(
      (acc: number, line: string) => acc + this.calculateLineCalibration(line),
      0
    );

    return calibrationValue;
  }

  /**
   * Calculates the line calibration based on the given line.
   *
   * @param {string} line - The line to calculate the calibration from.
   * @return {number} The calculated line calibration.
   */
  private calculateLineCalibration(line: string): number {
    let numbers: number[] = [];

    for (const letter of line) {
      const parsedNumber = parseInt(letter, 10);

      if (!isNaN(parsedNumber)) {
        numbers.push(parsedNumber);
      }
    }

    const firstValue = numbers.length > 0 ? numbers[0] : 0;
    const lastValue =
      numbers.length > 1 ? numbers[numbers.length - 1] : firstValue;

    return parseInt(`${firstValue}${lastValue}`, 10);
  }
}

const trebuchet = new Trebuchet();
const calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
