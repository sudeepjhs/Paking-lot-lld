const VehicleService = require("./services/VehicleService");
const ParkingLotService = require("./services/ParkingLotService");
const TicketService = require("./services/TicketService");
const SpotService = require("./services/SpotService");
const PricingService = require("./services/PricingService");
const inquirer = require("inquirer");
const { VehicleType } = require("./entities/Vehicle");

// const questions = [
//     {
//         type: 'list',
//         name: 'action',
//         message: 'What do you want to do?',
//         choices: [
//             'Create a parking lot',
//             'Create a parking spot',
//             'Park a vehicle',
//             'Unpark a vehicle',
//             'Get the status of a spot',
//             'Get the status of a parking lot',
//             'Get the status of a vehicle',
//             'Exit',
//         ],
//     },
// ];
// inquirer.prompt(questions).then((answers) => {
// //     const action = answers.action;
// //     switch (action){
// //         case 'Create a parking lot':
// //             createParkingLot();
// //             break;
// //         case 'Create a parking spot':
// //             createParkingSpot();
// //             break;
// //         case 'Park a vehicle':
// //             parkVehicle();
// //             break;
// //         case 'Unpark a vehicle':
// //             unparkVehicle();
// //             break;
// //         case 'Get the status of a spot':
// //             getSpotStatus();
// //             break;
// //         case 'Get the status of a parking lot':
// //             getParkingLotStatus();
// //             break;
// //         case 'Get the status of a vehicle':
// //             getVehicleStatus();
// //             break;
// //         case 'Exit':
// //             exit();
// //             break;

// //     }
// // })

/**
 * @description This method initiates the parking lot creation process and returns all type of services required by the parking lot.
 * @returns {{vehicleService: VehicleService,spotService: SpotService,ticketService:TicketService,pricingService:PricingService,parkingLotService:ParkingLotService}} - The parking lot service.
 **/
const initializer = async () => {
  console.log("Initiazing the application");
  const vehicleService = new VehicleService();
  const spotService = new SpotService();
  const ticketService = new TicketService();
  const pricingService = new PricingService();
  const parkingLotService = new ParkingLotService(
    spotService,
    ticketService,
    vehicleService,
    pricingService,
  );
  return {
    vehicleService,
    spotService,
    ticketService,
    pricingService,
    parkingLotService,
  };
};

initializer()
  .then((services) => {
    console.log("Parking lot is successfully initialized");
    console.log("Checking price is set or not");
    const setPriceQuestion = [];
    Object.values(VehicleType).forEach((vehicleType) => {
      console.log("Checking price for " + vehicleType);
      const rate = services.pricingService.checkPrice(vehicleType);
      if (rate) {
        console.log(
          "Price is set for " + vehicleType + " and the rate is " + rate,
        );
      } else {
        console.log("Price is not set for " + vehicleType);
        setPriceQuestion.push({
          type: "input",
          name: vehicleType + "_price",
          message: "Enter the price for " + vehicleType,
          validate(value) {
            const pass = value.match(/^\d+$/);
            if (pass && value > 0) return true;
            return "Please enter a valid number";
          },
        });
      }
    });
    inquirer.prompt(setPriceQuestion).then((answers) => {
      Object.values(VehicleType).forEach((vehicleType) => {
        const rate = answers[vehicleType + "_price"];
        if (rate) {
          console.log(
            "Setting price for " + vehicleType + " and the rate is " + rate,
          );
          services.pricingService.setSpotPrice(vehicleType, rate);
        }
      });
    });
  })
  .catch((err) => console.log(err));
