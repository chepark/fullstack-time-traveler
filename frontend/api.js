// all api requests
const BASE_URL = "http://127.0.0.1:5000";

export const createUser = (username) => {};

export const fetchUser = (username) => {};

export const fetchAllAirports = async () => {
  const url = BASE_URL + "/airport/all";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

export const createNewGame = () => {};

export const updateCo2Benefit = (gameId, benefit) => {};
