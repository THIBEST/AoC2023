import { readFileSync } from "fs";
import { join } from "path";

type MapEntry = {
  dstRangeStart: number;
  srcRangeStart: number;
  rangeLength: number;
};

type GardenMap = MapEntry[];

class Fertilizer {
  maps: GardenMap[] = [];
  seeds: number[] = [];

  constructor() {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    const [seedsLine, ...otherLines] = fileContent.split("\n");
    this.seeds = this.parseNumbers(seedsLine.split(":")[1]);
    this.initialiseMaps(otherLines);
  }

  /**
   * Initialises maps based on the input lines.
   *
   * @param {string[]} lines - an array of strings representing the input lines.
   * @return {void}
   */
  initialiseMaps(lines: string[]): void {
    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }

      if (line.includes("map")) {
        this.maps.push([]);
        continue;
      }

      const [dstRangeStart, srcRangeStart, rangeLength] =
        this.parseNumbers(line);
      this.maps[this.maps.length - 1].push({
        dstRangeStart,
        srcRangeStart,
        rangeLength,
      });
    }
  }

  /**
   * Parses a string of numbers into an array of integers.
   *
   * @param {string} line - The string of numbers to be parsed.
   * @return {number[]} An array of integers parsed from the input string.
   */
  parseNumbers(line: string): number[] {
    return line
      .trim()
      .split(" ")
      .map((x) => parseInt(x, 10));
  }

  /**
   * A function that calculates and returns the lowest location value.
   *
   * @return {number} the lowest location value.
   */
  getLowestLocation(): number {
    let lowest = Infinity;

    this.seeds.forEach((seed) => {
      let currentDst = seed;
      for (const map of this.maps) {
        currentDst = this.getDstByMap(currentDst, map);
      }
      if (currentDst < lowest) {
        lowest = currentDst;
      }
    });

    return lowest;
  }

  /**
   * A function to get the destination by map.
   *
   * @param {number} src - the source number.
   * @param {GardenMap} map - the garden map.
   * @return {number} the destination number.
   */
  getDstByMap(src: number, map: GardenMap): number {
    const mapEntry = map.find(
      ({ srcRangeStart, rangeLength }) =>
        src >= srcRangeStart && src <= srcRangeStart + rangeLength
    );

    if (!mapEntry) {
      return src;
    }

    const offset = src - mapEntry.srcRangeStart;
    const dst = mapEntry.dstRangeStart + offset;
    return dst;
  }
}

const fertilizer = new Fertilizer();
const lowestLocation = fertilizer.getLowestLocation();
console.log("TOTAL: ", lowestLocation);
