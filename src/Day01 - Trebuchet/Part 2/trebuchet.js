"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var textNumbers = [
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
var Trebuchet = /** @class */ (function () {
    function Trebuchet() {
    }
    /**
     * Returns the calibration value calculated from the data in the input file.
     *
     * @return {number} The calibration value.
     */
    Trebuchet.prototype.getCalibrationValue = function () {
        var _this = this;
        var filePath = path.join(__dirname, "../input.txt");
        var fileContent = fs.readFileSync(filePath, "utf8");
        var dataLines = fileContent.split("\n");
        var calibrationValue = dataLines.reduce(function (acc, line) {
            var lineCalibration = _this.calculateLineCalibration(line);
            return acc + lineCalibration;
        }, 0);
        return calibrationValue;
    };
    /**
     * Calculates the line calibration value.
     *
     * @param {string} line - The input line.
     * @return {number} The calculated line calibration value.
     */
    Trebuchet.prototype.calculateLineCalibration = function (line) {
        var numbers = [];
        for (var i = 0; i < line.length; i++) {
            var letter = line[i];
            var parsedNumber = parseInt(letter, 10);
            if (!isNaN(parsedNumber)) {
                numbers.push(parsedNumber);
            }
            else {
                var lineSubstring = line.substring(i);
                for (var j = 0; j < textNumbers.length; j++) {
                    var textNumber = textNumbers[j];
                    if (lineSubstring.startsWith(textNumber)) {
                        numbers.push(j + 1);
                    }
                }
            }
        }
        var firstValue = numbers.length > 0 ? numbers[0] : 0;
        var lastValue = numbers.length > 1 ? numbers[numbers.length - 1] : firstValue;
        var calibrationValue = parseInt("".concat(firstValue).concat(lastValue), 10);
        console.log("line: ".concat(line), "Calibration value: ".concat(calibrationValue));
        return parseInt("".concat(firstValue).concat(lastValue), 10);
    };
    return Trebuchet;
}());
var trebuchet = new Trebuchet();
var calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
