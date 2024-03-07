const Ticket = require("../entities/Ticket");
const TicketRepository = require("../repositories/TicketRepository");
const { Spot } = require("../entities/Spot");
const { Vehicle } = require("../entities/Vehicle");

/**
 * @class TicketService
 * @description This class represents a service for tickets.
 **/
class TicketService {
  /**
   * @param {TicketRepository} ticketRepository - The repository for tickets.
   **/
  constructor(ticketRepository) {
    if (ticketRepository) this.ticketRepository = ticketRepository;
    else this.ticketRepository = new TicketRepository();
  }

  /**
   * @description This method creates a new ticket.
   * @param {Vehicle} vehicle - The vehicle.
   * @param {Date} entryTimestamp - The entry time of the vehicle.
   * @param {Spot} assignedSpot - The parking spot of the vehicle.
   * @returns {Ticket} - The created ticket.
   **/
  createTicket(vehicle, entryTimestamp, assignedSpot) {
    if (!vehicle || typeof vehicle !== "object")
      throw new Error("vehicle is required");
    if (!entryTimestamp) throw new Error("entryTimestamp is required");
    if (!assignedSpot) throw new Error("assignedSpot is required");
    if (typeof assignedSpot !== "object" || !assignedSpot.get_available())
      throw new Error("assignedSpot is not available");

    return this.ticketRepository.addTicket(
      vehicle.get_license_plate(),
      entryTimestamp,
      assignedSpot,
    );
  }

  /**
   * @description This method gets the ticket based on the vehicle for exit.
   * @param {Vehicle} vehicle - The vehicle.
   * @returns {Ticket} - The ticket.
   **/
  findTicketByVehicleForExit(vehicle) {
    if (!vehicle) throw new Error("vehicle is required");
    if (typeof vehicle !== "object" || !vehicle.get_type())
      throw new Error("vehicle is not a vehicle");
    return this.ticketRepository.findEntryTicketByVehicleLicensePlate(
      vehicle.get_license_plate(),
    );
  }

  /**
   * @description This method gets the ticket based on the spot for exit.
   * @param {Spot} spot - The spot.
   * @returns {Ticket} - The ticket.
   **/
  findTicketBySpot(spot) {
    if (!spot) throw new Error("spot is required");
    if (typeof spot !== "object" || !spot.get_vehicle())
      throw new Error("spot is not associated with any ticket");
    return this.ticketRepository.findEntryTicketByVehicleLicensePlate(
      spot.get_vehicle().get_license_plate(),
    );
  }

  /**
   * @description This method sets the exit time of the ticket.
   * @param {Ticket} ticket - The ticket.
   * @param {Date} exitTimestamp - The exit time of the ticket.
   * @returns {Ticket} - The updated ticket.
   **/
  addExitTime(ticket, exitTimestamp) {
    if (!ticket) throw new Error("ticket is required");
    if (!exitTimestamp) throw new Error("exitTimestamp is required");
    if (typeof exitTimestamp !== "object")
      throw new Error("exitTimestamp is not a valid date");
    if (typeof ticket !== "object")
      throw new Error("ticket is not a valid ticket");
    this.ticketRepository.setExitTimestamp(ticket, exitTimestamp);
    return ticket;
  }

  /**
   * @description This method sets the price of the ticket.
   * @param {Ticket} ticket - The ticket.
   * @param {number} price - The price of the ticket.
   * @returns {Ticket} - The updated ticket.
   **/
  addPrice(ticket, price) {
    if (!ticket) throw new Error("ticket is required");
    if (!price) throw new Error("price is required");
    if (typeof price !== "number")
      throw new Error("price is not a valid number");
    if (typeof ticket !== "object")
      throw new Error("ticket is not a valid ticket");
    if (price <= 0) throw new Error("price must be greater than 0");
    this.ticketRepository.setTicketPrice(ticket, price);
    return ticket;
  }

  /**
   * @description This method calculate the duration of parking from the ticket entry and exit date.
   * @param {Ticket} ticket - The ticket.
   * @returns {number} - The duration of parking in hours.
   **/
  calculateDuration(ticket) {
    const entryTimestamp = ticket.get_entryTimestamp();
    const exitTimestamp = ticket.get_exitTimestamp();
    const duration = (exitTimestamp - entryTimestamp) / (1000 * 60 * 60); // Convert to hours;
    return duration;
  }
}

module.exports = TicketService;
