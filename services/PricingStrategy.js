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
  constructor(spotPricing) {
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
    return rate * duration;
  }

  setSpotPrice(vehicle_type, newPrice) {
    this.#pricing[vehicle_type] = newPrice;
  }
}

export default PricingStrategy;
