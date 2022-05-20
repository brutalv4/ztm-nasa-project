const REQUIRED_PROPS = ["mission", "rocket", "launchDate", "target"];

function validate(rawLaunch) {
  const missingProps = checkMissingProps(rawLaunch);
  if (missingProps.length) {
    return `Missing required props: ${missingProps.join(", ")}`;
  }

  if (hasValidLaunchDate(rawLaunch)) {
    return `Invalid launch date: ${rawLaunch.launchDate}`;
  }

  return undefined;
}

function checkMissingProps(rawLaunch) {
  return REQUIRED_PROPS.filter((prop) => !rawLaunch[prop] && prop);
}

function hasValidLaunchDate({ launchDate }) {
  // TODO one possible solution: new Date(launchDate) !== "Invalid Date"
  // under the hood will call Date.valueOf() and get the unix timestamp which is number
  return isNaN(new Date(launchDate));
}

module.exports = {
  validate,
};
