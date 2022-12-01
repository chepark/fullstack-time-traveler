// ADD TRY ACCEPT in each method

// all api requests
const BASE_URL = "http://127.0.0.1:5000";

export const getUser = () => {
  const uerURL = "";
};

export const fetchAllAirports = async () => {
  const allAirportsURL = `${BASE_URL}/airport/all`;

  const response = await fetch(allAirportsURL);
  const { data } = await response.json();

  return data;
};

export const fetchNewGame = async () => {
  const newGameURL = "";
};

export const getResult = async () => {
  const resultURL = "";
};

export const fetchNewGoal = async (userid, gameid, current_loc) => {
  const newGoalURL = `${BASE_URL}/newgoal?userid=${userid}?gameid=${gameid}?current_loc=${current_loc}`;
  const response = await fetch(newGoalURL);

  // complete rest...
};
