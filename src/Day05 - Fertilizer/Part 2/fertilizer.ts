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
  seedsRanges: { start: number; end: number }[] = [];

  constructor() {
    const filePath = join(__dirname, "../input.txt");
    const fileContent = readFileSync(filePath, "utf8");
    const [seedsLine, ...otherLines] = fileContent.split("\n");
    this.initialiseSeeds(seedsLine);
    this.initialiseMaps(otherLines);
  }

  /**
   * Initialises the seeds based on the provided seeds line.
   *
   * @param {string} seedsLine - the line containing the seeds.
   * @return {void}
   */
  initialiseSeeds(seedsLine: string): void {
    const seedsAndRanges = this.parseNumbers(seedsLine.split(":")[1]);
    for (let i = 0; i < seedsAndRanges.length; i += 2) {
      this.seedsRanges.push({
        start: seedsAndRanges[i],
        end: seedsAndRanges[i] + seedsAndRanges[i + 1],
      });
    }
  }

  /**
   * Initialises maps based on the input lines.
   *
   * @param {string[]} mapsLines - an array of strings representing the input lines.
   * @return {void}
   */
  initialiseMaps(mapsLines: string[]): void {
    for (const line of mapsLines) {
      if (line.trim() === "") {
        continue;
      }

      if (line.includes("map")) {
        this.maps.unshift([]);
        continue;
      }

      const [dstRangeStart, srcRangeStart, rangeLength] =
        this.parseNumbers(line);
      this.maps[0].push({
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
    for (let location = 0; ; location++) {
      const seed = this.calculateSeedByLocation(location);
      if (this.doesSeedExist(seed)) {
        return location;
      }
    }
  }

  /**
   * Check if the given seed exists within the seed ranges.
   *
   * @param {number} seed - the seed to check.
   * @return {boolean} true if the seed exists, false otherwise.
   */
  doesSeedExist(seed: number): boolean {
    return this.seedsRanges.some(
      ({ start, end }) => seed >= start && seed <= end
    );
  }

  /**
   * Calculates the seed value based on the given location.
   *
   * @param {number} location - The location to calculate the seed value for.
   * @return {number} The calculated seed value.
   */
  calculateSeedByLocation(location: number): number {
    return this.maps.reduce((dst, map) => this.getSrcByMap(dst, map), location);
  }

  /**
   * A function to get the destination by map.
   *
   * @param {number} dst - the source number.
   * @param {GardenMap} map - the garden map.
   * @return {number} the destination number.
   */
  getSrcByMap(dst: number, map: GardenMap): number {
    const mapEntry = map.find(
      ({ dstRangeStart, rangeLength }) =>
        dst >= dstRangeStart && dst <= dstRangeStart + rangeLength
    );

    if (!mapEntry) {
      return dst;
    }

    const offset = dst - mapEntry.dstRangeStart;
    const src = mapEntry.srcRangeStart + offset;
    return src;
  }
}

const fertilizer = new Fertilizer();
const lowestLocation = fertilizer.getLowestLocation();
console.log("TOTAL: ", lowestLocation);
