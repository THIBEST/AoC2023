"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Trebuchet = /** @class */ (function () {
    function Trebuchet() {
    }
    Trebuchet.prototype.getCalibrationValue = function () {
        var filePath = path.join(__dirname, "./input.txt");
        var fileContent = fs.readFileSync(filePath, "utf8");
        var dataLines = fileContent.split("\n");
        var calibrationValue = 0;
        for (var _i = 0, dataLines_1 = dataLines; _i < dataLines_1.length; _i++) {
            var line = dataLines_1[_i];
            calibrationValue += this.calculLineCalibration(line);
        }
        return calibrationValue;
    };
    Trebuchet.prototype.calculLineCalibration = function (line) {
        var firstValue = -1;
        var lastValue = -1;
        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var letter = line_1[_i];
            if (+letter) {
                if (firstValue === -1) {
                    firstValue = +letter;
                }
                else {
                    lastValue = +letter;
                }
            }
        }
        if (lastValue === -1) {
            lastValue = firstValue;
        }
        return +(firstValue.toString() + lastValue.toString());
    };
    return Trebuchet;
}());
var trebuchet = new Trebuchet();
var calibrationValue = trebuchet.getCalibrationValue();
console.log(calibrationValue);
