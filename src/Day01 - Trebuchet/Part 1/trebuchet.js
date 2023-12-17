"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Trebuchet = /** @class */ (function () {
    function Trebuchet() {
    }
    /**
     * Retrieves the calibration value by reading data from a file and calculating the line calibration.
     *
     * @return {number} The calibration value.
     */
    Trebuchet.prototype.getCalibrationValue = function () {
        var _this = this;
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        var dataLines = fileContent.split("\n");
        var calibrationValue = dataLines.reduce(function (acc, line) { return acc + _this.calculateLineCalibration(line); }, 0);
        return calibrationValue;
    };
    /**
     * Calculates the line calibration based on the given line.
     *
     * @param {string} line - The line to calculate the calibration from.
     * @return {number} The calculated line calibration.
     */
    Trebuchet.prototype.calculateLineCalibration = function (line) {
        var numbers = [];
        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var letter = line_1[_i];
            var parsedNumber = parseInt(letter, 10);
            if (!isNaN(parsedNumber)) {
                numbers.push(parsedNumber);
            }
        }
        var firstValue = numbers.length > 0 ? numbers[0] : 0;
        var lastValue = numbers.length > 1 ? numbers[numbers.length - 1] : firstValue;
        return parseInt("".concat(firstValue).concat(lastValue), 10);
    };
    return Trebuchet;
}());
var trebuchet = new Trebuchet();
var calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
