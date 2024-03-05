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
   * @param {Date} entry_time - The time when the vehicle entered the parking lot.
   **/
  constructor(license_plate, vehicle_type, entry_time) {
    this.license_plate = license_plate;
    this.vehicle_type = vehicle_type;
    this.entry_time = entry_time;
    this.exit_time = null;
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
    return this.type;
  }

  /**
   * @description This method gets the entry time of the vehicle.
   * @returns {Date} - The entry time of the vehicle.
   **/
  get_entry_time() {
    return this.entry_time;
  }

  /**
   * @description This method sets the exit time of the vehicle.
   * @param {Date} exit_time - The exit time of the vehicle.
   **/
  set_exit_time(exit_time) {
    this.exit_time = exit_time;
  }

  /**
   * @description This method gets the exit time of the vehicle.
   * @returns {Date} - The exit time of the vehicle.
   **/
  get_exit_time() {
    return this.exit_time;
  }
}

export default Vehicle;
