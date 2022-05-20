const { validate } = require("./launches.validation");

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAll() {
  return Array.from(launches.values());
}

function addNew(launch) {
  const error = validate(launch);

  if (error) {
    throw new Error(error);
  }

  latestFlightNumber++;
  launches.set(latestFlightNumber, newLaunch(launch));

  return launches.get(latestFlightNumber);
}

function abort(id) {
  const launch = launches.get(id);

  if (!launch) {
    throw new Error(`Launch with id ${id} not found`);
  }

  launch.upcoming = false;
  launch.success = false;

  return launch;
}

function newLaunch(launch, customer = ["ZTM", "NASA"]) {
  return {
    customer,
    ...launch,
    launchDate: new Date(launch.launchDate),
    success: true,
    upcoming: true,
    flightNumber: latestFlightNumber,
  };
}

module.exports = {
  getAll,
  addNew,
  abort,
};
