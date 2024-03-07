const { VehicleType, Vehicle } = require("../entities/Vehicle");
const VehicleRepository = require("../repositories/VehicleRepository");

/**
 * @class VehicleService
 * @description This class represents a service for vehicles.
 **/
class VehicleService {
  /**
   * @param {VehicleRepository} vehicleRepository - The repository for vehicles.
   **/
  constructor(vehicleRepository) {
    if (vehicleRepository) this.vehicleRepository = vehicleRepository;
    else this.vehicleRepository = new VehicleRepository();
  }

  /**
   * @description This method creates a new vehicle.
   * @param {string} license_plate - The license plate number of the vehicle.
   * @param {VehicleType} type - The type of the vehicle.
   * @returns {Vehicle} - The created vehicle.
   **/
  addVehicle(license_plate, vehicle_type) {
    if (!license_plate || typeof license_plate !== "string")
      throw new Error("license_plate is invalid");
    if (!Object.values(VehicleType).includes(vehicle_type))
      throw new Error("vehicle_type is invalid");
    const v = new Vehicle(license_plate, vehicle_type);
    return this.vehicleRepository.addVehicle(v);
  }

  /**
   * @description This method gets the Object of the vehicle based on the Id.
   * @param {number} id - The Id of the vehicle.
   * @returns {Vehicle} - The vehicle.
   **/
  getVehicleById(id) {
    const vehicle = this.vehicleRepository.findVehicleById(id);
    if (!vehicle) throw new Error("vehicle not found");
    return vehicle;
  }

  /**
   * @description This method gets the Object of the vehicle based on the license plate.
   * @param {string} license_plate - The license plate number of the vehicle.
   * @returns {Vehicle} - The vehicle.
   **/
  getVehicleByLicensePlate(license_plate) {
    if (!license_plate) throw new Error("license_plate is required");
    return this.vehicleRepository.findVehicleByLicensePlate(license_plate);
  }

  /**
   * @description This method gets the Object List of the vehicle.
   * @returns {Array<Vehicle>} - The vehicle list.
   **/
  getAllVehicles() {
    return this.vehicleRepository.findAllVehicles();
  }

  getVehicleTypes() {
    return Object.values(VehicleType);
  }
}

module.exports = VehicleService;
