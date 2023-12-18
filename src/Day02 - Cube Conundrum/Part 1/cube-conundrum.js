"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var CubeConundrum = /** @class */ (function () {
    function CubeConundrum(maxRed, maxGreen, maxBlue) {
        this.maxRed = maxRed;
        this.maxGreen = maxGreen;
        this.maxBlue = maxBlue;
    }
    CubeConundrum.prototype.getIdSumPossibleGames = function () {
        var _this = this;
        var filePath = (0, path_1.join)(__dirname, "../input.txt");
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf8");
        var dataLines = fileContent.split("\n");
        var idSumPossibleGames = dataLines.reduce(function (acc, line, index) {
            var sets = _this.getSets(line);
            if (_this.isGamePossible(sets)) {
                return acc + index + 1;
            }
            else {
                return acc;
            }
        }, 0);
        return idSumPossibleGames;
    };
    CubeConundrum.prototype.getSets = function (line) {
        return line
            .split(":")[1]
            .replace(/,\s/g, ",")
            .replace(/;\s/g, ";")
            .split(";");
    };
    CubeConundrum.prototype.isGamePossible = function (sets) {
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            var values = set.split(",");
            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                var value = values_1[_a];
                var number = parseInt(value.split(" ")[0]);
                var color = value.split(" ")[1];
                if ((color === "red" && number > this.maxRed) ||
                    (color === "green" && number > this.maxGreen) ||
                    (color === "blue" && number > this.maxBlue)) {
                    return false;
                }
            }
        }
        return true;
    };
    return CubeConundrum;
}());
var cubeConundrum = new CubeConundrum(12, 13, 14);
var idSumPossibleGames = cubeConundrum.getIdSumPossibleGames();
console.log(idSumPossibleGames);
