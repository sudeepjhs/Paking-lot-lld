# Paking-lot-lld
LLD Design of Parking lot

# Context
Design a parking lot system.
The primary objective of the system is to automate the ticketing system at a multi-level parking lot.

# Requirements:
Multiple Levels: The parking lot has multiple levels. Each level has multiple rows of spots.

**Different Spot Sizes:**

  ● The parking lot can park motorcycles, cars, and buses.
  
  ● The parking lot has motorcycle spots, compact spots, and large spots.

**Entry and Exit:**

● Multiple automated ticketing systems at both the entrance and the exit.

**Pricing:**

  ● Parking charges are based on vehicle type and the duration of parking.
  
  ● Pricing can change in the future.

**Features:**

  ● When a vehicle enters, it gets a ticket from the entry ticketing system. The ticket will have the vehicle's license plate, timestamp, and assigned spot.
  
  ● Vehicles need to be parked in spots that fit their size, or a larger spot if the appropriate size is unavailable.
  
  ● A vehicle can only be parked if a spot is available.
  
  ●At the exit, the vehicle gives the ticket, and the system calculates the charge.

**Additional Requirements:**

  ● Provide a method to find the current available spots for each vehicle type.
  
  ● Provide a method to count the number of vehicles currently in the lot. 
