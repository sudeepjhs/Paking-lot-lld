import Spot, { SpotType } from "../entities/Spot";
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

  findSpotBySize(size) {
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

  /**
   * @description This method park the vehical from the spot.
   * @param {Spot} spot - The spot.
   * @param {Vehicle} vehicle - The vehicle.
   **/
  park(spot, vehicle) {
    if (!this.canVehicleFit(vehicle, spot))
      throw new Error("spot is not available");
    spot.set_vehicle(vehicle);
    spot.set_available(false);
  }

  /**
   * @description This method unpark the vehical from the spot.
   * @param {Spot} spot - The spot.
   **/
  unpark(spot) {
    if (!spot) throw new Error("spot is required");
    if (!spot.get_vehicle()) throw new Error("spot is already vacant");
    spot.set_vehicle(null);
    spot.set_available(true);
  }

  /**
   * @description This method checks if the vehicle can fit in the spot.
   * @param {Vehicle} vehicle - The vehicle.
   * @param {Spot} spot - The spot.
   * @return {boolean} - True if the vehicle can fit in the spot.
   **/
  canVehicleFit(vehicle, spot) {
    if (!vehicle) throw new Error("vehicle is required");
    if (!spot) throw new Error("spot is required");
    if (spot.get_vehicle()) throw new Error("spot is already occupied");
    if (
      vehicle.get_type() === VehicleType.CAR &&
      spot.get_size() === SpotType.MOTORCYCLE
    )
      return false;
    if (
      vehicle.get_type() === VehicleType.BUS &&
      (spot.get_size() === SpotType.COMPACT ||
        spot.get_size() === SpotType.MOTORCYCLE)
    )
      return false;
    return true;
  }
}

export default SpotRepository;
