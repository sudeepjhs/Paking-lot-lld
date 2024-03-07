const ParkingLotRepository = require("../repositories/PakingLotRepository");
const TicketService = require("./TicketService");
const VehicleService = require("./VehicleService");
const { SpotSize } = require("../entities/Spot");
const { VehicleType } = require("../entities/Vehicle");
const Ticket = require("../entities/Ticket");
const PricingService = require("./PricingService");
const SpotService = require("./SpotService");

/**
 * @class ParkingLotService
 * @description This class represents a service for parking lots.
 **/
class ParkingLotService {
  /**
   * @param {SpotService} spotService - The service for spots.
   * @param {TicketService} ticketService - The service for tickets.
   * @param {VehicleService} vehicleService - The service for vehicles.
   * @param {PricingService} pricingService - The service for pricing.
   **/
  constructor(spotService, ticketService, vehicleService, pricingService) {
    if (!spotService || typeof spotService !== "object")
      throw new Error("spotService is required");
    if (!ticketService || typeof ticketService !== "object")
      throw new Error("ticketService is required");
    if (!vehicleService || typeof vehicleService !== "object")
      throw new Error("vehicleService is required");
    if (!pricingService || typeof pricingService !== "object")
      throw new Error("pricingService is required");
    this.spotService = spotService;
    this.ticketService = ticketService;
    this.vehicleService = vehicleService;
    this.pricingService = pricingService;
    this.pakingLotRepository = new ParkingLotRepository(
      this.spotService.spotRepository,
    );
  }

  /**
   * @description This method adds a new parking level and returns the level number.
   * @returns {number} - The level number.
   **/
  addPakingLevel() {
    const level = this.pakingLotRepository.addPakingLevel();
    return level.levelNumber;
  }

  /**
   * @description This method get all the parking levels in the parking lot.
   * @returns {Array<ParkingLevel>} - All the parking levels.
   **/
  getParkingLevel() {
    return this.pakingLotRepository.findAllPakingLevel();
  }

  /**
   * @description This method adds N number of spots in the level based on the level number.
   * @param {number} levelNumber - The level number of the parking lot.
   * @param {keyof SpotSize} spot_size - The size of the spot
   * @param {number} noOfSpots - Number of spots
   **/
  addSpotInLevelByVehicleType(levelNumber, spot_size, noOfSpots) {
    if (!levelNumber) throw new Error("levelNumber is required");
    if (!spot_size) throw new Error("spot_size is required");
    if (!noOfSpots) throw new Error("noOfSpots is required");
    if (noOfSpots <= 0) throw new Error("noOfSpots should be greater than 0");
    if (!Object.values(SpotSize).includes(spot_size))
      throw new Error("Invalid spot size");
    const level =
      this.pakingLotRepository.findPakingLevelByLevelNumber(levelNumber);
    if (!level) throw new Error("level is not found");
    this.pakingLotRepository.addVehicleSpot(levelNumber, spot_size, noOfSpots);
  }

  /**
   * @description This method get all spot in the specific level.
   * @param {number} levelNumber - The level number of the parking lot.
   * @returns {Array<Spot>} - All the spots in the level.
   **/
  getSpotInLevel(levelNumber) {
    if (!levelNumber) throw new Error("levelNumber is required");
    const level =
      this.pakingLotRepository.findPakingLevelByLevelNumber(levelNumber);
    if (!level) throw new Error("level is not found");
    return level.rows;
  }

  /**
   * @description This method park the vehicle and generate ticket.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @param {keyof VehicleType} vehicle_type - The type of the vehicle
   * @param {Date} entryTimestamp - The entry time of the vehicle.
   * @return {Ticket} - The ticket generated.
   **/
  parkVehicle(vehicle_license_plate, vehicle_type, entryTimestamp) {
    if (!vehicle_license_plate)
      throw new Error("vehicle_license_plate is required");
    if (!entryTimestamp) throw new Error("entryTimestamp is required");
    if (!vehicle_type) throw new Error("vehicle_type is required");
    const vehicle = this.vehicleService.getVehicleByLicensePlate(
      vehicle_license_plate,
    );
    if (!vehicle) {
      if (!Object.values(VehicleType).includes(vehicle_type))
        throw new Error("vehicle_type is invalid");
      vehicle = this.vehicleService.addVehicle(
        vehicle_license_plate,
        vehicle_type,
      );
    }
    const spot = this.spotService.findSpotByVehicle(vehicle);
    if (spot) throw new Error("Vehical is already parked");
    const Alllevel = this.pakingLotRepository.findAllPakingLevel();
    if (!Alllevel) throw new Error("level is not found");
    for (const level of Alllevel) {
      const spots = this.spotService.findAllSpotByAvailability(
        true,
        level.get_rows(),
      );
      if (spots.length > 0) {
        let vehicleSpot = this.spotService.findSpotsByVehicleType(
          vehicle_type,
          spots,
        );
        if (vehicleSpot.length > 0) {
          const selectedSpot = vehicleSpot[0];
          this.spotService.park(selectedSpot, vehicle);
          const ticket = this.ticketService.createTicket(
            vehicle,
            entryTimestamp,
            selectedSpot,
          );
          return ticket;
        }
      }
    }
    for (const level of Alllevel) {
      const spots = this.spotService.findAllSpotByAvailability(
        true,
        level.get_rows(),
      );
      if (spots.length > 0) {
        for (const spot in spots) {
          if (this.spotService.canVehicleFit(vehicle, spot)) {
            this.spotService.park(spot, vehicle);
            const ticket = this.ticketService.createTicket(
              vehicle,
              entryTimestamp,
              spot,
            );
            return ticket;
          }
        }
      }
    }

    throw new Error("No spot is available");
  }

  /**
   * @description This method unpark the vehicle and return the total charges amount.
   * @param {string} vehicle_license_plate - The license plate number of the vehicle.
   * @param {Date} exitTimestamp - The exit time of the vehicle.
   * @return {number} - The total charges amount.
   **/
  unParkVehicle(vehicle_license_plate, exitTimestamp) {
    if (!vehicle_license_plate)
      throw new Error("vehicle_license_plate is required");
    if (!exitTimestamp) throw new Error("exitTimestamp is required");
    const vehicle = this.vehicleService.getVehicleByLicensePlate(
      vehicle_license_plate,
    );
    if (!vehicle) throw new Error("vehicle is not found");
    const ticket = this.ticketService.findTicketByVehicleForExit(vehicle);
    if (!ticket) throw new Error("ticket is not found");
    const spot = this.spotService.findSpotByVehicle(vehicle);
    if (!spot) throw new Error("vehicle is not parked");
    this.ticketService.addExitTime(ticket, exitTimestamp);
    const duration = this.ticketService.calculateDuration(ticket);
    const charge = this.pricingService.calculateCharge(
      spot.get_vehicle(),
      duration,
    );
    this.ticketService.addPrice(ticket, charge);
    this.spotService.unpark(spot);
    return charge;
  }

  /**
   * @description This method update the price of the spot.
   * @param {keyof SpotSize} spot_size - The size of the spot
   * @param {number} newPrice - The new price of the spot
   **/
  setSpotNewPrice(spot_size, newPrice) {
    if (!spot_size) throw new Error("spot_size is required");
    if (!newPrice) throw new Error("newPrice is required");
    if (typeof newPrice !== "number" || newPrice <= 0)
      throw new Error("newPrice should be greater than 0");
    if (!Object.values(SpotSize).includes(spot_size))
      throw new Error("Invalid spot size");
    this.pricingService.setSpotPrice(spot_size, newPrice);
  }
}

module.exports = ParkingLotService;
