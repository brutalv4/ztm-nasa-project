const { planets } = require("../../models");

function httpGetAllPlanets(req, res) {
  return res.status(200).json(planets.getAll());
}

module.exports = {
  httpGetAllPlanets,
};
