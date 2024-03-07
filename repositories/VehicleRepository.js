const { VehicleType, Vehicle } = require("../entities/Vehicle");

/**
 * @class VehicleRepository
 * @description This class represents a repository for vehicles.
 **/
class VehicleRepository {
  constructor() {
    this._vehicles = {};
    this._autoIncrement = 1;
  }

  /**
   * @param {Vehicle} vehicle - The vehicle to be added.
   * @returns {Vehicle} - The created vehicle.
   **/
  addVehicle(vehicle) {
    const v = new Vehicle(vehicle.get_license_plate(), vehicle.get_type());
    this._vehicles[this._autoIncrement] = v;
    this._autoIncrement++;
    return v;
  }

  /**
   * @description This method gets the Object of the vehicle based on the Id.
   * @param {number} id - The Id of the vehicle.
   * @returns {Vehicle} - The vehicle.
   **/
  findVehicleById(id) {
    return this._vehicles[id];
  }

  /**
   * @description This method gets the Object of the vehicle based on the license plate.
   * @param {string} license_plate - The license plate number of the vehicle.
   * @returns {Vehicle} - The vehicle.
   **/
  findVehicleByLicensePlate(license_plate) {
    if (!license_plate || typeof license_plate !== "string")
      throw new Error("license_plate is required");
    return Object.values(this._vehicles).find(
      (v) => v.license_plate === license_plate,
    );
  }

  /**
   * @description This method gets the Object List of the vehicle.
   * @returns {Array<Vehicle>} - The vehicle list.
   **/
  findAllVehicles() {
    return Object.values(this._vehicles);
  }

  /**
   * @description This method gets the Object List of the vehicle based on the vehicle type.
   * @param {keyof VehicleType} vehicle_type - The type of the vehicle.
   * @returns {Array<Vehicle>} - The vehicle list.
   **/
  findVehicleByVehicleType(vehicle_type) {
    if (!vehicle_type) throw new Error("vehicle_type is required");
    if (!Object.values(VehicleType).includes(vehicle_type))
      throw new Error("vehicle_type is invalid");

    return Object.values(this._vehicles).filter(
      (v) => v.vehicle_type === vehicle_type,
    );
  }

  /**
   * @description This method removes the Vehicle from the list based on the Id.
   * @param {number} id - The Id of the vehicle.
   **/
  removeVehicle(id) {
    if (!id) throw new Error("id is required");
    if (!this._vehicles[id]) throw new Error("vehicle not found");
    delete this._vehicles[id];
  }

  /**
   * @description This method return the count of the vehicles in the parking lot.
   * @returns {number} - The count of the vehicles in the parking lot.
   **/
  countVehicles() {
    return this.findAllVehicles().length;
  }

  /**
   * @description This method return the count of the vehicles in the parking lot based on the vehicle type.
   * @param {keyof VehicleType} vehicle_type - The type of the vehicle.
   * @returns {number} - The count of the vehicles in the parking lot based on the vehicle type.
   **/
  countVehiculesByType(vehicle_type) {
    return this.findVehicleByVehicleType(vehicle_type).length;
  }
}

module.exports = VehicleRepository;
