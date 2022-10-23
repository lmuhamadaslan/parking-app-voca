const fs = require('fs')
const { resolve } = require('path')
// Create parking lot of size n : create_parking_lot {capacity}
const parkingLot = [];
const create_parking_lot = (capacity) => {
  for (let i = 0; i < capacity; i++) {
    parkingLot.push({
      slot: i + 1,
      registrationNumber: null,
      parkedAt: null,
    })
  }
  return parkingLot
}

// Park a car : park {car_number}
const park = (car_number) => {
  // cek available park slot
  const availableSlot = parkingLot.find((slot) => slot.registrationNumber === null)
  if (availableSlot) {
    availableSlot.registrationNumber = car_number;
    availableSlot.parkedAt = new Date();
    return `Allocated slot number: ${availableSlot.slot}`;
  } else {
    return "Sorry, parking lot is full"
  }
}

// Remove(Unpark) car from : leave {car_number} {hours}
const leave = (car_number, hours) => {
  const slot = parkingLot.find((slot) => slot.registrationNumber === car_number);
  if (slot) {
    slot.registrationNumber = null;
    slot.parkedAt = null;
    return `Registration number ${car_number} Slot Number ${slot.slot} is free with Charge ${hours > 2 ? 10 + (hours - 2) * 10 : 20}`;
  } else {
    return `Registration number ${car_number} not found`
  }
}

// Print status of parking slot : status
const status = () => {
  const availableSlot = parkingLot.filter((slot) => slot.registrationNumber !== null)
  if (availableSlot.length > 0) {
    console.log('Slot No. Registration No.');
    availableSlot.forEach((slot) => {
      console.log(`${slot.slot} ${slot.registrationNumber}`);
    })
  }
  return availableSlot
}

const run = (input) => {
  const [command, ...args] = input.split(" ");
  switch (command) {
    case "create_parking_lot":
      return create_parking_lot(...args);
    case "park":
      return park(...args);
    case "leave":
      return leave(...args);
    case "status":
      return status(...args);
    default:
      return "Invalid command";
  }
};

const testParkingApp = () => {
  const input = fs.readFileSync(resolve(__dirname, "input.txt"), "utf-8");
  const output = input.split("\n").map(run);
  fs.writeFileSync(resolve(__dirname, "output.txt"), output.join("\n"));
};

testParkingApp();

/*
create_parking_lot 6
park KA-01-HH-1234
park KA-01-HH-9999
park KA-01-BB-0001
park KA-01-HH-7777
park KA-01-HH-2701
park KA-01-HH-3141
leave KA-01-HH-3141 4
status
park KA-01-P-333
park DL-12-AA-9999
leave KA-01-HH-1234 4
leave KA-01-BB-0001 6
leave DL-12-AA-9999 2
park KA-09-HH-0987
park CA-09-IO-1111
park KA-09-HH-0123
Status
*/

// const createdNewParking = create_parking_lot(6);
// console.log(park('KA-01-HH-1234'))
// console.log(park('KA-01-HH-9999'))
// console.log(park('KA-01-BB-0001'))
// console.log(park('KA-01-HH-7777'))
// console.log(park('KA-01-HH-2701'))
// console.log(park('KA-01-HH-3141'))
// console.log(leave('KA-01-HH-3141', 4))
// status(createdNewParking);

/*
park KA-01-P-333
park DL-12-AA-9999
leave KA-01-HH-1234 4
leave KA-01-BB-0001 6
leave DL-12-AA-9999 2
park KA-09-HH-0987
park CA-09-IO-1111
park KA-09-HH-0123
Status
*/
// console.log(park('KA-01-P-333'))
// console.log(park('DL-12-AA-9999'))
// console.log(leave('KA-01-HH-1234', 4))
// console.log(leave('KA-01-BB-0001', 6))
// console.log(leave('DL-12-AA-9999', 2))
// console.log(park('KA-09-HH-0987'))
// console.log(park('CA-09-IO-1111'))
// console.log(park('KA-09-HH-0123'))
// status(createdNewParking)
