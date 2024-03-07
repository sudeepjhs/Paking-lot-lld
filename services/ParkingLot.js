import ParkingLotRepository from "../repositories/PakingLotRepository";
import TicketRepository from "../repositories/TicketRepository";
import VehicleRepository from "../repositories/VehicleRepository";
import SpotRepository from "../repositories/SpotRepository";
import { SpotSize } from "../entities/Spot";
import { VehicleType } from "../entities/Vehicle";
import Ticket from "../entities/Ticket";
import PricingStrategy from "./PricingStrategy";

/**
 * @class ParkingLot
 * @description This class represents a parking lot.
 **/
class ParkingLot extends PricingStrategy {
  /**
   * @param {number} total_levels - The total number of levels in the parking lot.
   * @param {number} car_price - The price of a car vehicle type.
   * @param {number} motorcycle_price - The price of a motorcycle vehicle type.
   * @param {number} bus_price - The price of a bus vehicle type.
   **/
  constructor(car_price, motorcycle_price, bus_price) {
    this.spotRepository = new SpotRepository();
    this.pakingLotRepository = new ParkingLotRepository(this.spotRepository);
    this.ticketRepository = new TicketRepository();
    this.vehicleRepository = new VehicleRepository();
    super({
      CAR: car_price,
      MOTORCYCLE: motorcycle_price,
      BUS: bus_price,
    });
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
    const vehicle = this.vehicleRepository.findVehicleByLicensePlate(
      vehicle_license_plate,
    );
    if (!vehicle) {
      if (!Object.values(VehicleType).includes(vehicle_type))
        throw new Error("vehicle_type is invalid");
      vehicle = this.vehicleRepository.addVehicle(
        vehicle_license_plate,
        vehicle_type,
      );
    }
    const spot = this.spotRepository.findSpotByVehicle(vehicle);
    if (spot) throw new Error("Vehical is already parked");
    const Alllevel = this.pakingLotRepository.findAllPakingLevel();
    if (!Alllevel) throw new Error("level is not found");
    for (const level of Alllevel) {
      const spots = this.spotRepository.findAllSpotByAvailability(
        true,
        level.get_rows(),
      );
      if (spots.length > 0) {
        let vehicleSpot = this.spotRepository.findSpotsByVehicleType(
          vehicle_type,
          spots,
        );
        if (vehicleSpot.length > 0) {
          const selectedSpot = vehicleSpot[0];
          this.spotRepository.park(selectedSpot, vehicle);
          const ticket = this.ticketRepository.addTicket(
            vehicle,
            entryTimestamp,
            selectedSpot,
          );
          return ticket;
        }
      }
    }
    for (const level of Alllevel) {
      const spots = this.spotRepository.findAllSpotByAvailability(
        true,
        level.get_rows(),
      );
      if (spots.length > 0) {
        for (const spot in spots) {
          if (this.spotRepository.canVehicleFit(vehicle, spot)) {
            this.spotRepository.park(spot, vehicle);
            const ticket = this.ticketRepository.addTicket(
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
    const ticket = this.ticketRepository.findEntryTicketByVehicleLicensePlate(
      vehicle_license_plate,
    );
    if (!ticket) throw new Error("ticket is not found");
    const vehicle = this.vehicleRepository.findVehicleByLicensePlate(
      vehicle_license_plate,
    );
    if (!vehicle) throw new Error("vehicle is not found");
    const spot = this.spotRepository.findSpotByVehicle(vehicle);
    if (!spot) throw new Error("vehicle is not parked");
    this.ticketRepository.setExitTimestamp(ticket, exitTimestamp);
    const duration = this.ticketRepository.calculateDuration(ticket);
    const charge = super.calculateCharge(spot.get_vehicle(), duration);
    this.ticketRepository.setTicketPrice(ticket, charge);
    this.spotRepository.unpark(spot);
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
    super.setSpotPrice(spot_size, newPrice);
  }
}

export default ParkingLot;
