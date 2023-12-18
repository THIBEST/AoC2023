"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Scratchcards = /** @class */ (function () {
    function Scratchcards() {
        this.scratchcardsList = [];
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        this.dataLines = fileContent.split("\n");
        this.formatLines();
        this.createScratchcards();
    }
    /**
     * Formats the lines of data.
     *
     * @return {void} - This function does not return anything.
     */
    Scratchcards.prototype.formatLines = function () {
        this.dataLines = this.dataLines.map(function (line) { return line.split(":")[1].trim(); });
    };
    /**
     * Creates scratchcards based on the data lines.
     *
     * @private
     * @returns {void} The function does not return a value.
     */
    Scratchcards.prototype.createScratchcards = function () {
        for (var _i = 0, _a = this.dataLines; _i < _a.length; _i++) {
            var line = _a[_i];
            var lineSplit = line.split(" | ");
            var winningNumbers = lineSplit[0].trim().split(" ");
            var playingNumbers = lineSplit[1]
                .trim()
                .replace(/ {2}/g, " ")
                .split(" ");
            var howMany = 1;
            this.scratchcardsList.push({
                id: this.scratchcardsList.length + 1,
                winningNumbers: winningNumbers,
                playingNumbers: playingNumbers,
                howMany: howMany,
            });
        }
    };
    /**
     * Calculates the total number of scratchcards.
     *
     * @return {number} The total number of scratchcards.
     */
    Scratchcards.prototype.getnumberOfScratchcards = function () {
        var totalScratchcards = 0;
        for (var _i = 0, _a = this.scratchcardsList; _i < _a.length; _i++) {
            var scratchcard = _a[_i];
            this.processScratchcard(scratchcard);
            totalScratchcards += scratchcard.howMany;
        }
        return totalScratchcards;
    };
    /**
     * Calculates the number of winning numbers in a given line.
     *
     * @param {string} scratchcard - The line to analyze.
     * @return {number} The number of winning numbers or 0 if there are none.
     */
    Scratchcards.prototype.processScratchcard = function (scratchcard) {
        var nbOfMatchingNumbers = scratchcard.playingNumbers.reduce(function (count, playingNumber) {
            if (scratchcard.winningNumbers.includes(playingNumber)) {
                return count + 1;
            }
            return count;
        }, 0);
        this.scratchcardsList.slice(scratchcard.id, scratchcard.id + nbOfMatchingNumbers).forEach(function (card) {
            card.howMany += scratchcard.howMany;
        });
    };
    return Scratchcards;
}());
var scratchcards = new Scratchcards();
var scratchcardsPoints = scratchcards.getnumberOfScratchcards();
console.log("TOTAL:", scratchcardsPoints);
