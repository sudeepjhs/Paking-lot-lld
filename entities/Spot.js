import ParkingLevel from "./ParkingLevel";
import ParkingRow from "./ParkingRow";
import Vehicle from "./Vehicle";

export const SpotSize = Object.freeze({
  COMPACT,
  MOTORCYCLE,
  LARGE,
});

/**
 * @class Spot
 * @description This class represents a spot in the parking lot.
 **/
class Spot {
  /**
   * @param {number} spotNumber - The number of the spot.
   * @param {keyof SpotSize} size - The size of the spot.
   * @param {ParkingLevel} level - The level of the spot.
   * @param {ParkingRow} row - The row of the spot.
   **/
  constructor(size, level, row) {
    this.size = size;
    this.available = true;
    this.vehicle = null;
    this.level = level;
    this.row = row;
  }

  /**
   * @description This method gets the size of the spot.
   * @returns {keyof SpotType} - The size of the spot.
   **/
  get_size() {
    return this.size;
  }

  /**
   * @description This method gets the availability of the spot.
   * @returns {boolean} - The availability of the spot.
   **/
  get_available() {
    return this.available;
  }
  /**
   * @description This method sets the availability of the spot.
   * @param {boolean} available - The availability of the spot.
   **/
  set_available(available) {
    this.available = available;
  }

  /**
   * @description This method gets the vehicle parked in the spot.
   * @returns {Vehicle} - The vehicle parked in the spot.
   **/
  get_vehicle() {
    return this.vehicle;
  }

  /**
   * @description This method sets the vehicle parked in the spot.
   * @param {Vehicle} vehicle - The vehicle parked in the spot.
   **/
  set_vehicle(vehicle) {
    this.vehicle = vehicle;
  }
  /**
   * @description This method gets the row of the spot.
   * @returns {ParkingRow} - The row of the spot.
   **/
  get_row() {
    return this.row;
  }
  /**
   * @description This method gets the level of the spot.
   * @returns {ParkingLevel} - The level of the spot.
   **/
  get_level() {
    return this.level;
  }
}

export default Spot;
