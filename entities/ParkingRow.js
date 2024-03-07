/**
 * @class ParkingRow
 * @description This class represents a parking row in the parking lot.
 **/
class ParkingRow {
  /**
   * @param {number} rowNumber - The number of the row.
   * @param {Spot} spots - The spot in the row.
   **/
  constructor(rowNumber) {
    this.rowNumber = rowNumber;
  }

  /**
   * @description This method gets the number of the row.
   * @returns {number} - The number of the row.
   **/
  get_rowNumber() {
    return this.rowNumber;
  }
}

module.exports = ParkingRow;
