import * as fs from "fs";
import * as path from "path";

const textNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

class Trebuchet {
  /**
   * Returns the calibration value calculated from the data in the input file.
   *
   * @return {number} The calibration value.
   */
  getCalibrationValue(): number {
    const filePath = path.join(__dirname, "../input.txt");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const dataLines = fileContent.split("\n");

    const calibrationValue = dataLines.reduce((acc, line) => {
      const lineCalibration = this.calculateLineCalibration(line);
      return acc + lineCalibration;
    }, 0);

    return calibrationValue;
  }

  /**
   * Calculates the line calibration value.
   *
   * @param {string} line - The input line.
   * @return {number} The calculated line calibration value.
   */
  private calculateLineCalibration(line: string): number {
    const numbers: number[] = [];

    for (let i = 0; i < line.length; i++) {
      const letter = line[i];
      const parsedNumber = parseInt(letter, 10);

      if (!isNaN(parsedNumber)) {
        numbers.push(parsedNumber);
      } else {
        const lineSubstring = line.substring(i);
        for (let j = 0; j < textNumbers.length; j++) {
          const textNumber = textNumbers[j];
          if (lineSubstring.startsWith(textNumber)) {
            numbers.push(j + 1);
          }
        }
      }
    }

    const firstValue = numbers[0] || 0;
    const lastValue = numbers[numbers.length - 1] || firstValue;

    return parseInt(`${firstValue}${lastValue}`, 10);
  }
}

const trebuchet = new Trebuchet();
const calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
