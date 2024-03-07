import { VehicleType } from "../entities/Vehicle";

class PricingStrategy {
  #pricing = {
    CAR: 0,
    MOTORCYCLE: 0,
    BUS: 0,
  };
  /**
      @param {{CAR:number,
  MOTORCYCLE:number,
  BUS:number}} spotPricing - The pricing of the spot.
    **/
  constructor(spotPricing = null) {
    this.#pricing = spotPricing;
  }
  /**
   * @description This method calculate the total price of the parking.
   * @param {keyof VehicleType } vehicle_type - The type of vehicle park.
   * @param {Date} duration - The duration of the parking.
   * @returns {number} - The total price of the parking.
   **/
  calculateCharge(vehicle_type, duration) {
    const rate = this.#pricing[vehicle_type];
    if (!rate) throw new Error("pricing not found for " + vehicle_type);
    return rate * duration;
  }

  setSpotPrice(vehicle_type, newPrice) {
    if (!Object.values(VehicleType).includes(vehicle_type))
      throw new Error("vehicle_type is invalid");
    this.#pricing[vehicle_type] = newPrice;
  }

  /**
   * @description This method get the price of the spot based on vehicle type.
   * @param {keyof VehicleType } vehicle_type - The type of vehicle.
   * @return {number} - The price of the spot
   **/
  checkPrice(vehicle_type) {
    if (!vehicle_type) throw new Error("spot_size is required");
    if (!Object.values(VehicleType).includes(vehicle_type))
      throw new Error("vehicle_type is invalid");
    return this.calculateCharge(vehicle_type, 1);
  }

  /**
   * @description This method get the price of the spot based on vehicle type.
   * @param {keyof VehicleType } vehicle_type - The type of vehicle.
   * @return {number} - The price of the spot
   **/
  getPrice(vehicle_type) {
    if (!Object.values(VehicleType).includes(vehicle_type))
      throw new Error("vehicle_type is invalid");
    this.#pricing[vehicle_type];
  }

  /**
   * @description This method get the price of all vehicel type.
   **/
  getAllPrice() {
    return this.#pricing;
  }
}

export default PricingStrategy;
