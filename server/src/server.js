(async function () {
  const http = require("http");

  let path = ".env";
  if (process.env.ENV) {
    path += `.${process.env.ENV}`;
  }

  require("dotenv").config({ path });

  const PORT = process.env.PORT || 8000;

  // preloading planets from CSV
  const { loadPlanetsData } = require("./models/planets.model");
  await loadPlanetsData();

  // creating server in this way allows to use other protocols (SOCKETS etc)
  http.createServer(require("./app")).listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})();
