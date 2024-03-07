import Spot from "./Spot";

/**
 * @class Ticket
 * @description This class represents a ticket in the parking lot.
 **/
class Ticket {
  /**
   * @param {number} ticket_id - The ID of the ticket.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @param {Date} entryTimestamp - The entry time of the vehicle.
   * @param {Spot} assignedSpot - The parking spot of the vehicle.
   **/
  constructor(ticket_id, vehicle_license_plate, entryTimestamp, assignedSpot) {
    this.ticket_id = ticket_id;
    this.vehicle_license_plate = vehicle_license_plate;
    this.entryTimestamp = entryTimestamp;
    this.assignedSpot = assignedSpot;
    this.exitTimestamp = null;
    this.price = 0;
  }
  /**
   * @description This method gets the ID of the ticket.
   * @returns {number} - The ID of the ticket.
   **/
  get_ticket_id() {
    return this.ticket_id;
  }
  /**
   * @description This method gets the license plate number of the vehicle.
   * @returns {string} - The license plate number of the vehicle.
   **/
  get_vehicle_license_plate() {
    return this.vehicle_license_plate;
  }
  /**
   * @description This method gets the entry time of the vehicle.
   * @returns {Date} - The entry time of the vehicle.
   **/
  get_entryTimestamp() {
    return this.entryTimestamp;
  }
  /**
   * @description This method gets the parking spot of the vehicle.
   * @returns {Spot} - The parking spot of the vehicle.
   **/
  get_assignedSpot() {
    return this.assignedSpot;
  }
  /**
   * @description This method gets the exit time of the vehicle.
   * @returns {Date} - The exit time of the vehicle.
   **/
  get_exitTimestamp() {
    return this.exitTimestamp;
  }

  /**
   * @description This method sets the exit time of the vehicle.
   * @param {Date} exitTimestamp - The exit time of the vehicle.
   **/
  set_exitTimestamp(exitTimestamp) {
    this.exitTimestamp = exitTimestamp;
  }

  /**
   * @description This method gets the price of the ticket.
   * @returns {number} - The price of the ticket.
   **/
  get_price() {
    return this.price;
  }

  /**
   * @description This method sets the price of the ticket.
   * @param {number} price - The price of the ticket.
   **/
  set_price(price) {
    this.price = price;
  }
}

export default Ticket;
