import * as fs from "fs";
import * as path from "path";

class Trebuchet {
  getCalibrationValue() {
    const filePath = path.join(__dirname, "./input.txt");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const dataLines = fileContent.split("\n");

    let calibrationValue: number = 0;

    for (const line of dataLines) {
      calibrationValue += this.calculLineCalibration(line);
    }

    return calibrationValue;
  }

  private calculLineCalibration(line: string): number {
    let firstValue: number = -1;
    let lastValue: number = -1;

    for (const letter of line) {
      if (+letter) {
        if (firstValue === -1) {
          firstValue = +letter;
        } else {
          lastValue = +letter;
        }
      }
    }

    if (lastValue === -1) {
      lastValue = firstValue;
    }

    return +(firstValue.toString() + lastValue.toString());
  }
}

const trebuchet = new Trebuchet();
const calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
