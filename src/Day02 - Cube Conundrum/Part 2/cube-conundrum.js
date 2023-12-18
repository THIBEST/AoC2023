"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var CubeConundrum = /** @class */ (function () {
    function CubeConundrum() {
    }
    /**
     * Calculates the sum of the indices of the lines in the input text file
     * where a game is possible.
     *
     * @return {number} The sum of the indices of the lines where a game is possible.
     */
    CubeConundrum.prototype.getSumOfPowersOfSets = function () {
        var _this = this;
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        var dataLines = fileContent.split("\n");
        var sumOfPowers = dataLines.reduce(function (acc, line) { return _this.getSumOfPowersReducer(acc, line); }, 0);
        return sumOfPowers;
    };
    /**
     * A reducer function that calculates the sum of powers.
     *
     * @param {number} acc - The accumulated value.
     * @param {string} line - The line to process.
     * @return {number} The updated accumulated value.
     */
    CubeConundrum.prototype.getSumOfPowersReducer = function (acc, line) {
        var sets = this.getSets(line);
        var minimumConfiguration = this.getMinConfiguration(sets);
        var powerOfSet = this.getPowerOfSet(minimumConfiguration);
        return acc + powerOfSet;
    };
    /**
     * Splits the given line by ":" and returns an array of sets.
     *
     * @param {string} line - The line to process.
     * @return {string[]} An array of sets.
     */
    CubeConundrum.prototype.getSets = function (line) {
        var setsPart = line.split(":")[1].trim();
        var sets = setsPart.replace(/,\s/g, ",").replace(/;\s/g, ";").split(";");
        return sets;
    };
    /**
     * Returns the minimum configuration of red, green, and blue values from the given sets.
     *
     * @param {string[]} sets - An array of sets containing values and colors.
     * @return {{[key: string]: number}} - An object with the minimum values of red, green, and blue.
     */
    CubeConundrum.prototype.getMinConfiguration = function (sets) {
        var minRed = 0;
        var minGreen = 0;
        var minBlue = 0;
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            var values = set.split(",");
            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                var value = values_1[_a];
                var _b = value.split(" "), number = _b[0], color = _b[1];
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
        return { minRed: minRed, minGreen: minGreen, minBlue: minBlue };
    };
    /**
     * Calculates the power of a set.
     *
     * @param {Object} set - The set containing key-value pairs of numbers and colors.
     * @return {number} The result of raising each value in the set to the power of 5 and summing them.
     */
    CubeConundrum.prototype.getPowerOfSet = function (set) {
        var minRed = set.minRed, minGreen = set.minGreen, minBlue = set.minBlue;
        return minRed * minGreen * minBlue;
    };
    return CubeConundrum;
}());
var cubeConundrum = new CubeConundrum();
var sumOfPowers = cubeConundrum.getSumOfPowersOfSets();
console.log(sumOfPowers);
