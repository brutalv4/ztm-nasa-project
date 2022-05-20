const apiOrigin = process.env.REACT_APP_API_ORIGIN;
const ENDPOINTS = {
  planets: "planets",
  launches: "launches",
};
const DEFAULT_HEADERS = { "Content-Type": "application/json" };

// Load planets and return as JSON.
async function httpGetPlanets() {
  return request(ENDPOINTS.planets);
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const launches = await request(ENDPOINTS.launches);

  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  return request(ENDPOINTS.launches, "POST", launch);
}

async function httpAbortLaunch(id) {
  return request(`${ENDPOINTS.launches}/${id}`, "DELETE");
}

async function request(path, method = "GET", data = null, headers = {}) {
  try {
    const response = await fetch(`${apiOrigin}/${path}`, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: { ...DEFAULT_HEADERS, ...headers },
    });

    return await response.json();
  } catch (error) {
    return { error };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
