const baseAPI = "https://api.spacexdata.com/v3";

const fetchRockets = () => {
  return fetch(`${baseAPI}/rockets`).then((res) => res.json());
};

const fetchRocket = (rocketId) => {
  return fetch(`${baseAPI}/rockets/${rocketId}`).then((res) => res.json());
};

const fetchLaunches = (limit = 5, offset = 0) => {
  return fetch(
    `${baseAPI}/launches?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());
};

const fetchLaunch = (flightNumber) => {
  return fetch(`${baseAPI}/launches/${flightNumber}`).then((res) => res.json());
};

export { fetchRockets, fetchRocket, fetchLaunches, fetchLaunch };
