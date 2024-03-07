import Ticket from "../entities/Ticket";

/**
 * @class TicketRepository
 * @description This class represents a repository for tickets.
 **/
class TicketRepository {
  constructor() {
    this._tickets = {};
    this.autoIncrement = 1;
  }
  /**
   * @description This method creates a new ticket.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @param {Date} entryTimestamp - The entry time of the vehicle.
   * @param {Spot} assignedSpot - The parking spot of the vehicle.
   * @returns {Ticket} - The created ticket.
   **/
  addTicket(vehicle_license_plate, entryTimestamp, assignedSpot) {
    const ticket = new Ticket(
      this.autoIncrement,
      vehicle_license_plate,
      entryTimestamp,
      assignedSpot,
    );
    this._tickets[this.autoIncrement] = ticket;
    this.autoIncrement++;
    return ticket;
  }

  /**
   * @description This method gets the ticket based on the ticket number.
   * @param {number} ticketId - The ticket number.
   * @returns {Ticket} - The ticket.
   **/
  findTicketById(ticketId) {
    return this._tickets[ticketId];
  }
 
  /**
   * @description This method gets all the tickets.
   * @returns {Array<Ticket>} - All the tickets.
   **/
  getAllTickets() {
    return Object.values(this._tickets);
  }

  /**
   * @description This method gets the ticket based on the license plate number and the exit date is not set.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @returns {Ticket} - The ticket.
   **/
  findEntryTicketByVehicleLicensePlate(vehicle_license_plate) {
    return Object.values(this._tickets).find(
      (ticket) =>
        ticket.get_vehicle_license_plate() === vehicle_license_plate &&
        ticket.get_exitTimestamp() === null,
    );
  }

  /**
   * @description This method gets the ticket based on the license plate number and the exit date is set.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @returns {Array<Ticket>} - The ticket.
   **/
  findExitTicketByVehicleLicensePlate(vehicle_license_plate) {
    return Object.values(this._tickets).filter(
      (ticket) =>
        ticket.get_vehicle_license_plate() === vehicle_license_plate &&
        ticket.get_exitTimestamp() !== null,
    );
  }

  /**
   * @description This method sets the exit timestamp of the ticket.
   * @param {Ticket} ticket - The ticket.
   * @param {Date} exitTimestamp - The exit time of the vehicle.
   **/
  setExitTimestamp(ticket, exitTimestamp) {
    if (ticket.get_exitTimestamp() !== null)
      throw new Error("Ticket already exited");
    if (ticket.get_entryTimestamp().getTime() > exitTimestamp.getTime()) {
      throw new Error("Invalid exit time");
    }
    ticket.set_exitTimestamp(exitTimestamp);
  }

  /**
   * @description This method gets the price of the ticket.
   * @param {Ticket} ticket - The ticket.
   * @returns {number} - The price of the ticket.
   **/
  getTicketPrice(ticket) {
    return ticket.get_price();
  }

  /**
   * @description This method sets the price of the ticket.
   * @param {Ticket} ticket - The ticket.
   * @param {number} price - The price of the ticket.
   **/
  setTicketPrice(ticket, price) {
    ticket.set_price(price);
  }

}

export default TicketRepository;
