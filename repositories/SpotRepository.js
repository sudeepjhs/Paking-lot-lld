import Spot from "../entities/Spot";
import ParkingLevel from "../entities/ParkingLevel";
import PaikingRow from "../entities/ParkingRow";
import Vehicle, { VehicleType } from "../entities/Vehicle";

class SpotRepository {
  constructor() {
    this._spots = [];
  }

  /**
   * @description This method adds a new spot.
   * @param {keyOf SpotType} size - The size of the spot.
   * @param {ParkingLevel} level - The level of the spot.
   * @param {PaikingRow} row - The row of the spot.
   * @return {Spot} - The new spot.
   **/
  createSpot(size, level, row) {
    const spot = new Spot(size, level, row);
    this._spots.push(spot);
    return spot;
  }

  /**
   * @description This method gets the spot based on the vehicle.
   * @param {Vehicle} vehicle - The vehicle.
   * @return {Spot} - The spot.
   **/
  findSpotByVehicle(vehicle) {
    return this._spots.find((s) => s.get_vehicle() === vehicle);
  }

  /**
   * @description This method gets the spot based on the vehicle type.
   * @param {VehicleType} vehicleType - The vehicle type.
   * @params {Optional<Array<Spot>>} spotList - The list of spots.
   * @return {Spot} - The spot.
   **/
  findSpotsByVehicleType(vehicleType, spotList = null) {
    if (spotList) {
      return spotList.filter(
        (s) => s.vehicle && s.get_vehicle().get_type() === vehicleType,
      );
    }
    return this._spots.filter(
      (s) => s.vehicle && s.get_vehicle().get_type() === vehicleType,
    );
  }

  /**
   * @description This method gets the list of spots based on their size.
   * @params {Optional<keyOf SpotType>} size - The size of the spot.
   * @params {Optional<Array<Spot>>} spotList - The list of spots.
   * @returns {Array<Spot>} - The list of spots.
   **/
  findSpotBySize(size, spotList = null) {
    if (spotList) return spotList.find((s) => s.get_size() === size);
    return this._spots.find((s) => s.get_size() === size);
  }

  /**
   * @description This method gets the list of spots based on their availability.
   * @params {Optional<Array<Spot>>} spotList - The list of spots.
   * @params {Optional<boolean>} available - The availability of the spot. Default is True.
   * @returns {Array<Spot>} - The list of spots.
   **/
  findAllSpotByAvailability(available = true, spotList = null) {
    if (spotList) {
      return spotList.filter((s) => s.get_available() === available);
    }
    return this._spots.filter((s) => s.get_available() === available);
  }
}

export default SpotRepository;
