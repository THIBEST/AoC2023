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
        for (var _i = 0, _a = this.dataLines; _i < _a.length; _i++) {
            var line = _a[_i];
            var number = '';
            var isNumber = false;
            for (var _b = 0, line_1 = line; _b < line_1.length; _b++) {
                var char = line_1[_b];
                if (!isNaN(parseInt(char))) {
                    number += char;
                    isNumber = true;
                }
                else if (isNumber) {
                    if (this.checkSides(this.dataLines.indexOf(line), line.indexOf(char) - 1)) {
                        sumOfPartnumbers += parseInt(number);
                    }
                    number = '';
                    isNumber = false;
                }
            }
            if (isNumber) {
                if (this.checkSides(this.dataLines.indexOf(line), line.length - 1)) {
                    sumOfPartnumbers += parseInt(number);
                }
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
