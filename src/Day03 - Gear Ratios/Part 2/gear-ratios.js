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
    GearRatios.prototype.getSumOfGearRatios = function () {
        var sumOfGearRatios = 0;
        for (var lineIndex = 0; lineIndex < this.dataLines.length; lineIndex++) {
            var line = this.dataLines[lineIndex];
            for (var charIndex = 0; charIndex < line.length; charIndex++) {
                var char = line[charIndex];
                if (char !== "*") {
                    continue;
                }
                sumOfGearRatios += this.getGearValue(lineIndex, charIndex);
            }
        }
        return sumOfGearRatios;
    };
    /**
     * Retrieves the gear value based on the given line index and character index.
     *
     * @param {number} lineIndex - The index of the line.
     * @param {number} charIndex - The index of the character.
     * @return {number} The gear value calculated based on the given indices.
     */
    GearRatios.prototype.getGearValue = function (lineIndex, charIndex) {
        var sidesWithNumber = this.getSidesWithNumber(lineIndex, charIndex);
        sidesWithNumber = this.filterConsecutivePositions(sidesWithNumber);
        return this.calculateGearValue(sidesWithNumber);
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
    GearRatios.prototype.getSidesWithNumber = function (lineIndex, charIndex) {
        var indexesOfSides = [];
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
                this.checkIfNumber(lineIdx, charIdx)) {
                indexesOfSides.push(adjacentIndex);
            }
        }
        return indexesOfSides;
    };
    /**
     * Checks if the character at the specified line and index position
     * is a number.
     *
     * @param {number} lineIndex - The index of the line.
     * @param {number} charIndex - The index of the character in the line.
     * @return {boolean} Returns true if the character is a number,
     *                   otherwise returns false.
     */
    GearRatios.prototype.checkIfNumber = function (lineIndex, charIndex) {
        var regex = /\d/;
        return regex.test(this.dataLines[lineIndex][charIndex]);
    };
    /**
     * Filters out consecutive positions from an array of positions.
     *
     * @param {Array<[number, number]>} positions - The array of positions to filter.
     * @return {Array<[number, number]>} The filtered array of positions.
     */
    GearRatios.prototype.filterConsecutivePositions = function (positions) {
        var prevPos = null;
        return positions.reduce(function (filteredArr, currPos) {
            if (!prevPos ||
                currPos[0] !== prevPos[0] ||
                currPos[1] !== prevPos[1] + 1) {
                filteredArr.push(currPos);
            }
            prevPos = currPos;
            return filteredArr;
        }, []);
    };
    /**
     * Calculates the gear value based on the sides with numbers.
     *
     * @param {Array<[number, number]>} sidesWithNumber - An array of tuples representing the line index and character index of sides with numbers.
     * @return {number} The calculated gear value.
     */
    GearRatios.prototype.calculateGearValue = function (sidesWithNumber) {
        if (sidesWithNumber.length !== 2) {
            return 0;
        }
        var firstNumber = -1;
        var secondNumber = -1;
        for (var _i = 0, sidesWithNumber_1 = sidesWithNumber; _i < sidesWithNumber_1.length; _i++) {
            var sideWithNumber = sidesWithNumber_1[_i];
            var lineIdx = sideWithNumber[0], charIdx = sideWithNumber[1];
            if (firstNumber === -1) {
                firstNumber = this.createNumber(lineIdx, charIdx);
            }
            else if (secondNumber === -1) {
                secondNumber = this.createNumber(lineIdx, charIdx);
            }
            else {
                break;
            }
        }
        firstNumber = firstNumber !== -1 ? firstNumber : 0;
        secondNumber = secondNumber !== -1 ? secondNumber : 0;
        return firstNumber * secondNumber;
    };
    /**
     * Creates a number based on the given line index and character index.
     *
     * @param {number} lineIndex - The index of the line.
     * @param {number} charIndex - The index of the character.
     * @return {number} The created number.
     */
    GearRatios.prototype.createNumber = function (lineIndex, charIndex) {
        var number = parseInt(this.dataLines[lineIndex][charIndex]);
        // Check recursively if there is a number on the left
        var initCharIndex = charIndex;
        while (charIndex - 1 >= 0 && this.checkIfNumber(lineIndex, charIndex - 1)) {
            number =
                parseInt(this.dataLines[lineIndex][charIndex - 1]) *
                    Math.pow(10, initCharIndex - charIndex + 1) +
                    number;
            charIndex--;
        }
        // Check recursively if there is a number on the right
        charIndex = initCharIndex;
        while (charIndex + 1 < this.dataLines[lineIndex].length &&
            this.checkIfNumber(lineIndex, charIndex + 1)) {
            number = number * 10 + parseInt(this.dataLines[lineIndex][charIndex + 1]);
            charIndex++;
        }
        return number;
    };
    return GearRatios;
}());
var gearRatios = new GearRatios();
var sumOfGearRatios = gearRatios.getSumOfGearRatios();
console.log("TOTAL: ", sumOfGearRatios);
