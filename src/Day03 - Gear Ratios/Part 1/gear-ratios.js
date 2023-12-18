"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var GearRatios = /** @class */ (function () {
    function GearRatios() {
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        this.dataLines = fileContent.split("\n");
    }
    /**
     * Calculates the sum of the part numbers in the data lines.
     *
     * @return {number} The sum of the part numbers.
     */
    GearRatios.prototype.getSumOfPartnumbers = function () {
        var sumOfPartnumbers = 0;
        for (var lineIndex = 0; lineIndex < this.dataLines.length; lineIndex++) {
            var line = this.dataLines[lineIndex];
            for (var charIndex = 0; charIndex < line.length; charIndex++) {
                var parsedNumber = parseInt(line[charIndex]);
                if (isNaN(parsedNumber)) {
                    continue;
                }
                var numberIndex = charIndex;
                var number = parsedNumber;
                while (numberIndex + 1 < line.length &&
                    !isNaN(parseInt(line[numberIndex + 1]))) {
                    numberIndex++;
                    number = number * 10 + parseInt(line[numberIndex]);
                }
                for (var t = charIndex; t <= numberIndex; t++) {
                    if (this.checkSides(lineIndex, t)) {
                        sumOfPartnumbers += number;
                        break;
                    }
                }
                charIndex = numberIndex;
            }
        }
        return sumOfPartnumbers;
    };
    /**
     * Check the sides of a given position in the dataLines array to see if there
     * is a symbol present.
     *
     * @param {number} lineIndex - The index of the line in the dataLines array.
     * @param {number} charIndex - The index of the character in the line.
     * @return {boolean} Returns true if a symbol is present in any of the adjacent
     * sides, otherwise returns false.
     */
    GearRatios.prototype.checkSides = function (lineIndex, charIndex) {
        var adjacentIndexes = [
            [lineIndex - 1, charIndex - 1],
            [lineIndex - 1, charIndex],
            [lineIndex - 1, charIndex + 1],
            [lineIndex, charIndex - 1],
            [lineIndex, charIndex + 1],
            [lineIndex + 1, charIndex - 1],
            [lineIndex + 1, charIndex],
            [lineIndex + 1, charIndex + 1],
        ];
        for (var _i = 0, adjacentIndexes_1 = adjacentIndexes; _i < adjacentIndexes_1.length; _i++) {
            var adjacentIndex = adjacentIndexes_1[_i];
            var lineIdx = adjacentIndex[0], charIdx = adjacentIndex[1];
            if (lineIdx >= 0 &&
                lineIdx < this.dataLines.length &&
                charIdx >= 0 &&
                charIdx < this.dataLines[lineIdx].length &&
                this.checkIfSymbol(lineIdx, charIdx)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks if the character at the specified line and index position
     * is a symbol.
     *
     * @param {number} lineIndex - The index of the line.
     * @param {number} charIndex - The index of the character in the line.
     * @return {boolean} Returns true if the character is a symbol,
     *                   otherwise returns false.
     */
    GearRatios.prototype.checkIfSymbol = function (lineIndex, charIndex) {
        var regex = /[^0-9.]/;
        return regex.test(this.dataLines[lineIndex][charIndex]);
    };
    return GearRatios;
}());
var gearRatios = new GearRatios();
var sumOfPartnumbers = gearRatios.getSumOfPartnumbers();
console.log("TOTAL: ", sumOfPartnumbers);
function part1RegEx() {
    var _a;
    var filePath = (0, path_1.join)(__dirname, "../input.txt");
    var input = (0, fs_1.readFileSync)(filePath, "utf8");
    var sum = (_a = input
        .match(/(\d*(?<=[^\d.\n\r].{140,142})\d+)|(\d+(?=.{140,142}[^\d.\n\r])\d*)|((?<=[^\d.\n\r])\d+)|(\d+(?=[^\d.\n\r]))/gs)) === null || _a === void 0 ? void 0 : _a.reduce(function (p, c) { return p + +c; }, 0);
    console.log("Should have been: ", sum);
}
part1RegEx();
