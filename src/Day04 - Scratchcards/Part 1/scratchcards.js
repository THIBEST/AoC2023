"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Scratchcards = /** @class */ (function () {
    function Scratchcards() {
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        this.dataLines = fileContent.split("\n");
        this.formatLines();
    }
    Scratchcards.prototype.formatLines = function () {
        this.dataLines = this.dataLines.map(function (line) { return line.split(":")[1].trim(); });
    };
    Scratchcards.prototype.getScratchcardsPoints = function () {
        var _this = this;
        var scratchcardsPoints = 0;
        for (var _i = 0, _a = this.dataLines; _i < _a.length; _i++) {
            var line = _a[_i];
            scratchcardsPoints += this.getLinePoints(line);
        }
        return this.dataLines.reduce(function (acc, line) { return acc + _this.getLinePoints(line); }, 0);
        return scratchcardsPoints;
    };
    /**
     * Calculates the number of winning numbers in a given line.
     *
     * @param {string} line - The line to analyze.
     * @return {number} The number of winning numbers or 0 if there are none.
     */
    Scratchcards.prototype.getLinePoints = function (line) {
        var lineSplit = line.split(" | ");
        var winningNumbers = lineSplit[0].trim().split(" ");
        var playingNumbers = lineSplit[1].trim().replace(/ {2}/g, " ").split(" ");
        var nbOfWiningNumbers = 0;
        for (var _i = 0, playingNumbers_1 = playingNumbers; _i < playingNumbers_1.length; _i++) {
            var playingNumber = playingNumbers_1[_i];
            if (winningNumbers.includes(playingNumber)) {
                nbOfWiningNumbers++;
            }
        }
        return nbOfWiningNumbers > 0 ? Math.pow(2, nbOfWiningNumbers - 1) : 0;
    };
    return Scratchcards;
}());
var scratchcards = new Scratchcards();
var scratchcardsPoints = scratchcards.getScratchcardsPoints();
console.log("TOTAL: ", scratchcardsPoints);
