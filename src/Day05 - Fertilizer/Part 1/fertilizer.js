"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Fertilizer = /** @class */ (function () {
    function Fertilizer() {
        this.maps = [];
        this.seeds = [];
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        var _a = fileContent.split("\n"), seedsLine = _a[0], otherLines = _a.slice(1);
        this.seeds = this.parseNumbers(seedsLine.split(":")[1]);
        this.initialiseMaps(otherLines);
    }
    /**
     * Initialises maps based on the input lines.
     *
     * @param {string[]} lines - an array of strings representing the input lines.
     * @return {void}
     */
    Fertilizer.prototype.initialiseMaps = function (lines) {
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.trim() === "") {
                continue;
            }
            if (line.includes("map")) {
                this.maps.push([]);
                continue;
            }
            var _a = this.parseNumbers(line), dstRangeStart = _a[0], srcRangeStart = _a[1], rangeLength = _a[2];
            this.maps[this.maps.length - 1].push({
                dstRangeStart: dstRangeStart,
                srcRangeStart: srcRangeStart,
                rangeLength: rangeLength,
            });
        }
    };
    /**
     * Parses a string of numbers into an array of integers.
     *
     * @param {string} line - The string of numbers to be parsed.
     * @return {number[]} An array of integers parsed from the input string.
     */
    Fertilizer.prototype.parseNumbers = function (line) {
        return line
            .trim()
            .split(" ")
            .map(function (x) { return parseInt(x, 10); });
    };
    /**
     * A function that calculates and returns the lowest location value.
     *
     * @return {number} the lowest location value.
     */
    Fertilizer.prototype.getLowestLocation = function () {
        var _this = this;
        var lowest = Infinity;
        this.seeds.forEach(function (seed) {
            var currentDst = seed;
            for (var _i = 0, _a = _this.maps; _i < _a.length; _i++) {
                var map = _a[_i];
                currentDst = _this.getDstByMap(currentDst, map);
            }
            if (currentDst < lowest) {
                lowest = currentDst;
            }
        });
        return lowest;
    };
    /**
     * A function to get the destination by map.
     *
     * @param {number} src - the source number.
     * @param {GardenMap} map - the garden map.
     * @return {number} the destination number.
     */
    Fertilizer.prototype.getDstByMap = function (src, map) {
        var mapEntry = map.find(function (_a) {
            var srcRangeStart = _a.srcRangeStart, rangeLength = _a.rangeLength;
            return src >= srcRangeStart && src <= srcRangeStart + rangeLength;
        });
        if (!mapEntry) {
            return src;
        }
        var offset = src - mapEntry.srcRangeStart;
        var dst = mapEntry.dstRangeStart + offset;
        return dst;
    };
    return Fertilizer;
}());
var fertilizer = new Fertilizer();
var lowestLocation = fertilizer.getLowestLocation();
console.log("TOTAL: ", lowestLocation);
