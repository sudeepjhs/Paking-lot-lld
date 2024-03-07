const {Spot} = require("./Spot");

/**
 * @class ParkingLevel
 * @description This class represents a parking level in the parking lot.
 **/
class ParkingLevel {
  constructor(levelNumber) {
    this.levelNumber = levelNumber;
    this.rows = [];
  }

  /**
   * @description This method gets the level number.
   * @returns {number} - The level number.
   **/
  get_levelNumber() {
    return this.levelNumber;
  }

  /**
   * @description This method gets the parking rows.
   * @returns {Array<Spot>} - The parking rows.
   **/
  get_rows() {
    return this.rows;
  }

  /**
   * @description This method adds a parking spot.
   * @param {Spot} spot - The parking spot to be added.
   **/
  addRow(spot) {
    this.rows.push(spot);
  }
}

module.exports = ParkingLevel;
