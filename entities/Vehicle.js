export const VehicleType = Object.freeze({
  CAR,
  MOTORCYCLE,
  BUS,
});

/**
 * @class Vehicle
 * @description This class represents a vehicle in the parking lot.
 */
class Vehicle {
  /**
   * @param {string} license_plate - The license plate number of the vehicle.
   * @param {keyof VehicleType} vehicle_type - The type of the vehicle
   **/
  constructor(license_plate, vehicle_type) {
    this.license_plate = license_plate;
    this.vehicle_type = vehicle_type;
  }

  /**
   * @description This method gets the license plate number of the vehicle.
   * @returns {string} - The license plate number of the vehicle.
   **/
  get_license_plate() {
    return this.license_plate;
  }

  /**
   * @description This method gets the type of the vehicle.
   * @returns {valueOf<VehicleType>} - The type of the vehicle.
   **/
  get_type() {
    return this.vehicle_type;
  }
}

export default Vehicle;
