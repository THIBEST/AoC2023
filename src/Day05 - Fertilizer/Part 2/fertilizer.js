"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Fertilizer = /** @class */ (function () {
    function Fertilizer() {
        this.maps = [];
        this.seedsRanges = [];
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        var _a = fileContent.split("\n"), seedsLine = _a[0], otherLines = _a.slice(1);
        this.initialiseSeeds(seedsLine);
        this.initialiseMaps(otherLines);
    }
    /**
     * Initialises the seeds based on the provided seeds line.
     *
     * @param {string} seedsLine - the line containing the seeds.
     * @return {void}
     */
    Fertilizer.prototype.initialiseSeeds = function (seedsLine) {
        var seedsAndRanges = this.parseNumbers(seedsLine.split(":")[1]);
        for (var i = 0; i < seedsAndRanges.length; i += 2) {
            this.seedsRanges.push({
                start: seedsAndRanges[i],
                end: seedsAndRanges[i] + seedsAndRanges[i + 1],
            });
        }
    };
    /**
     * Initialises maps based on the input lines.
     *
     * @param {string[]} mapsLines - an array of strings representing the input lines.
     * @return {void}
     */
    Fertilizer.prototype.initialiseMaps = function (mapsLines) {
        for (var _i = 0, mapsLines_1 = mapsLines; _i < mapsLines_1.length; _i++) {
            var line = mapsLines_1[_i];
            if (line.trim() === "") {
                continue;
            }
            if (line.includes("map")) {
                this.maps.unshift([]);
                continue;
            }
            var _a = this.parseNumbers(line), dstRangeStart = _a[0], srcRangeStart = _a[1], rangeLength = _a[2];
            this.maps[0].push({
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
        for (var location_1 = 0;; location_1++) {
            var seed = this.calculateSeedByLocation(location_1);
            if (this.doesSeedExist(seed)) {
                return location_1;
            }
        }
    };
    /**
     * Check if the given seed exists within the seed ranges.
     *
     * @param {number} seed - the seed to check.
     * @return {boolean} true if the seed exists, false otherwise.
     */
    Fertilizer.prototype.doesSeedExist = function (seed) {
        return this.seedsRanges.some(function (_a) {
            var start = _a.start, end = _a.end;
            return seed >= start && seed <= end;
        });
    };
    /**
     * Calculates the seed value based on the given location.
     *
     * @param {number} location - The location to calculate the seed value for.
     * @return {number} The calculated seed value.
     */
    Fertilizer.prototype.calculateSeedByLocation = function (location) {
        var _this = this;
        return this.maps.reduce(function (dst, map) { return _this.getSrcByMap(dst, map); }, location);
    };
    /**
     * A function to get the destination by map.
     *
     * @param {number} dst - the source number.
     * @param {GardenMap} map - the garden map.
     * @return {number} the destination number.
     */
    Fertilizer.prototype.getSrcByMap = function (dst, map) {
        var mapEntry = map.find(function (_a) {
            var dstRangeStart = _a.dstRangeStart, rangeLength = _a.rangeLength;
            return dst >= dstRangeStart && dst <= dstRangeStart + rangeLength;
        });
        if (!mapEntry) {
            return dst;
        }
        var offset = dst - mapEntry.dstRangeStart;
        var src = mapEntry.srcRangeStart + offset;
        return src;
    };
    return Fertilizer;
}());
var fertilizer = new Fertilizer();
var lowestLocation = fertilizer.getLowestLocation();
console.log("TOTAL: ", lowestLocation);
