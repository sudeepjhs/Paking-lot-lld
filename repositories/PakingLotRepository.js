const ParkingLevel = require("../entities/ParkingLevel");
const ParkingRow = require("../entities/ParkingRow");
const SpotRepository = require("./SpotRepository");

/**
 * @class ParkingLotRepository
 * @description This class represents a repository for parking lots.
 **/
class PakingLotRepository {
  /**
   * @param {SpotRepository} spotRepository - The repository for spots.
   **/
  constructor(spotRepository) {
    this._pakingLevel = [];
    this.autoIncrement = 1;
    this._spotRepository = spotRepository;
  }
  /**
   * @descripion This method adds a new parking level.
   **/
  addPakingLevel() {
    const level = new ParkingLevel(this.autoIncrement);
    this._pakingLevel.push(level);
    this.autoIncrement++;
    return level;
  }

  /**
   * @descripion This method gets the parking level.
   * @param {number} levelNumber - The levelNumber of the parking level.
   * @returns {ParkingLevel} - The parking level.
   **/
  findPakingLevelByLevelNumber(levelNumber) {
    return this._pakingLevel.find((p) => p.get_levelNumber() === levelNumber);
  }

  /**
   * @descripion This method add Parking row in the level.
   * @param {ParkingLevel} level - The parking level.
   * @param {number} rowNumber - The row number.
   * @param {keyof SpotSize} size - The size of the spot.
   **/
  #addParkingRow(level, rowNumber, size) {
    const parkingRow = new ParkingRow(rowNumber);
    const spot = this._spotRepository.createSpot(size, level, parkingRow);
    level.addRow(spot);
  }

  /**
   * @descripion This method adds N number of Spot in the level.
   * @param {number} levelNumber - The level of the parking.
   * @param {keyof SpotSize} size - The size of the spot.
   * @param {number} noOfSpots - Number of spots.
   **/
  addVehicleSpot(levelNumber, size, noOfSpots) {
    const level = this.findPakingLevelByLevelNumber(levelNumber);
    if (!level) throw new Error("level not found");
    for (let i = level.rows.length; i < level.rows.length + noOfSpots; i++) {
      this.#addParkingRow(level, i, size);
    }
  }

  /**
   * @descripion This method gets the list of parking level.
   * @returns {Array<ParkingLevel>} - The list of parking level.
   **/
  findAllPakingLevel() {
    return this._pakingLevel;
  }

  /**
   * @descripion This method removes the Packing Level from the Packing Lot.
   * @param {number} id - The id of the parking level.
   **/
  removePakingLevelById(id) {
    if (!id) throw new Error("id is required");
    if (!this._pakingLevel[id]) throw new Error("level not found");
    delete this._pakingLevel[id];
  }
}

module.exports = PakingLotRepository;
